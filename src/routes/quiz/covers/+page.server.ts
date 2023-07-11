import { db } from '$lib/firebase/firebase';
import { getRandomArtist } from '$lib/server/last-fm';
import { mbidToSpotifyId } from '$lib/server/music-brainz';
import { getToken, getArtist, getArtistAlbums, getSeveralAlbums } from '$lib/server/spotify';
import type { Album } from '$lib/server/spotify.types';
import { fail } from '@sveltejs/kit';
import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
import { read, MIME_JPEG } from 'jimp';
 
const numberOfAlbums = 3;

export const load = async ({ cookies }) => {
  const current_quiz = JSON.parse(cookies.get('covers') || '{}');

  let artistName = current_quiz?.artist?.name;
  let artistId = current_quiz?.artist?.id;
  const albumIds = current_quiz?.albums;
  let currentAlbumName = current_quiz?.currentAlbumName;

  if (!current_quiz.artist) {
    // get random artist
    const artist = await getRandomArtist();

    // assert that artist is valid
    if ('error' in artist)
      return {
        error: "Couldn't get artist"
      };

    artistName = artist.name;
    artistId = artist.mbid;
  }

  // get spotify token
  const spotifyToken = await getToken(cookies);
  let spotifyId;
  try {
    spotifyId = await mbidToSpotifyId(artistId);
  } catch (e) {
    console.log(e);
    return { error: "Couldn't get Spotify ID" };
  }

  if (!spotifyId) return { error: "Couldn't get Spotify ID" };

  // spotify get Artist
  const spotifyArtist = await getArtist(spotifyToken, spotifyId);
  if ('error' in spotifyArtist) return { error: "Couldn't get artist" };
  const artistImage = spotifyArtist.images[0].url;

  let albums = [];
  if (!albumIds) {
    const artistAlbums = await getArtistAlbums(spotifyToken, spotifyArtist.id);
    if ('error' in artistAlbums) return { error: "Couldn't get artist albums" };

    // Filter out any names that contain the name of another album (gets rid of deluxe editions, etc.)
    artistAlbums.items = artistAlbums.items.filter((album) => {
      const albumName = album.name.toLowerCase();
      return !artistAlbums.items.some((otherAlbum) => {
        const otherAlbumName = otherAlbum.name.toLowerCase();
        return albumName.includes(otherAlbumName) && albumName !== otherAlbumName;
      });
    });

    // get random albums
    artistAlbums.items.sort(() => Math.random() - 0.5);

    albums = artistAlbums.items.slice(0, numberOfAlbums);

    // set current album name
    currentAlbumName = albums[0].name;
  } else {
    // get albums from cookie
    const artistAlbums = await getSeveralAlbums(spotifyToken, albumIds);
    if ('error' in artistAlbums) return { error: "Couldn't get artist albums" };

    albums = artistAlbums.albums;

    // Setze den Namen des aktuellen Albums, falls er nicht bereits gespeichert ist
    if (!currentAlbumName) {
      const currentAlbum = albums.find((album) => album.id === albumIds[0]);
      currentAlbumName = currentAlbum?.name;
    }
  }
    // load and blurr the picture
    const image = await read(albums[0].images[0].url);
    image.blur(8); // blur level

    // convert picture
    const base64Image = await image.getBase64Async(MIME_JPEG);

    // save quiz to cookie
    cookies.set(
      'covers',
      JSON.stringify({
      artist: {
        name: artistName,
        id: artistId
      },
      albums: albums.map((album) => album.id),
      currentAlbumName // Save current album name in cookie
    }),
    {
      path: '/'
    }
  );

  return {
    albums: albums.map((album) => ({
      id: album.id,
      name: album.name,
      image: album.images[0].url // use normal album cover
    })),
    blurredImage: base64Image, 
    currentAlbumName // give back current album name
  };
};

export const actions = {
	default: async ({ request, cookies }) => {
	  const current_quiz = JSON.parse(cookies.get('covers') || '{}');
  
	  // evaluate answer
	  const answer = await request.formData();
	  const guess = answer.get('answer') as string;
  
	  const spotifyToken = await getToken(cookies);
	  const albums = await getSeveralAlbums(spotifyToken, current_quiz.albums);
  
	  // find current album
	  const currentAlbumName = current_quiz.currentAlbumName; // access to cached current album name 
	  let correctAlbum;
	  if ('albums' in albums) {
		correctAlbum = albums.albums.find((album) => album.name === currentAlbumName);
	  }
  
	  const isCorrect = correctAlbum?.name === guess;
  
	  // update user
	  await updateUser(isCorrect, answer.get('user_id') as string);
  
	  // reset quiz
	  cookies.set('covers', '', {
		path: '/'
	  });
  
	  if (!isCorrect) {
		return fail(400, { false: guess, correct: correctAlbum?.name });
	  } else {
		return fail(200, { false: null, correct: correctAlbum?.name });
	  }
	}
  };
  
const updateUser = async (correct: boolean, user_id: string) => {
	const userRef = doc(db, 'users', user_id);
	const userDoc = await getDoc(userRef);
	if (!userDoc.exists()) return;

	const userData = userDoc.data() as DocumentData;
	const newCorrect = (userData.stats?.correct || 0) + (correct ? 1 : 0);
	const newIncorrect = (userData.stats?.incorrect || 0) + (correct ? 0 : 1);

	await setDoc(
		userRef,
		{
			stats: {
				correct: newCorrect,
				incorrect: newIncorrect
			}
		},
		{ merge: true }
	);
};
