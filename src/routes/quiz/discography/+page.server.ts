import { getRandomArtist } from '$lib/server/last-fm';
import { mbidToSpotifyId } from '$lib/server/music-brainz';
import { getToken, getArtist, getArtistAlbums, getSeveralAlbums } from '$lib/server/spotify';
import type { Album } from '$lib/server/spotify.types';
import { fail } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('discography') || '{}');

	let artistName = current_quiz?.artist?.name;
	let artistId = current_quiz?.artist?.id;
	const albumIds = current_quiz?.albums;

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

	const spotifyToken = await getToken(cookies);
	let spotifyId;
	try {
		spotifyId = await mbidToSpotifyId(artistId);
	} catch (e) {
		console.log(e);
		return { error: "Couldn't get Spotify ID" };
	}

	if (!spotifyId) return { error: "Couldn't get Spotify ID" };

	const spotifyArtist = await getArtist(spotifyToken, spotifyId);
	if ('error' in spotifyArtist) return { error: "Couldn't get artist" };
	const artistImage = spotifyArtist.images[0].url;

	let albums: string[] | Album[] = [];
	if (!albumIds) {
		const artistAlbums = await getArtistAlbums(spotifyToken, spotifyArtist.id);
		if ('error' in artistAlbums) return { error: "Couldn't get artist albums" };

		// FIlter out any names that contain the name of another album (gets rid of deluxe editions, etc.)
		artistAlbums.items = artistAlbums.items.filter((album) => {
			const albumName = album.name.toLowerCase();
			return !artistAlbums.items.some((otherAlbum) => {
				const otherAlbumName = otherAlbum.name.toLowerCase();
				return albumName.includes(otherAlbumName) && albumName !== otherAlbumName;
			});
		});

		// get random albums
		artistAlbums.items.sort(() => Math.random() - 0.5);

		albums = artistAlbums.items.slice(0, 5);
	} else {
		// get albums from cookie
		const artistAlbums = await getSeveralAlbums(spotifyToken, albumIds);
		if ('error' in artistAlbums) return { error: "Couldn't get artist albums" };

		albums = artistAlbums.albums;
	}

	// save quiz to cookie
	cookies.set(
		'discography',
		JSON.stringify({
			artist: {
				name: artistName,
				id: artistId
			},
			albums: albums.map((album) => album.id)
		}),
		{
			path: '/'
		}
	);

	return {
		artist: {
			name: artistName,
			image: artistImage
		},
		albums: albums.map((album) => ({
			id: album.id,
			name: album.name,
			image: album.images[0].url
		}))
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const artistId = JSON.parse(cookies.get('discography') || '{}').artist;
		const albumIds = JSON.parse(cookies.get('discography') || '{}').albums;
		const response = await request.formData();

		const albums = await getSeveralAlbums(await getToken(cookies), albumIds);
		if ('error' in albums) return fail(200, {});

		const submittedOrder: string[] = JSON.parse(response.get('answer') as string) || '';
		console.log(submittedOrder);

		// get album data in correct order
		const correctOrder = albums.albums
			.map((album) => ({
				id: album.id,
				name: album.name,
				image: album.images[0].url,
				release_date: album.release_date
			}))
			.sort((a, b) => a.release_date.localeCompare(b.release_date));
		console.log(correctOrder);

		// calculate score based on acuracy of order
		const score = submittedOrder.reduce((acc, name, i) => {
			if (name === correctOrder[i].name) return acc + 1;
			return acc;
		}, 0);
		console.log(score);

		return fail(200, {});
	}
};

// const updateUser = async (correct: boolean, user_id: string) => {
// 	const userRef = doc(db, 'users', user_id);
// 	const userDoc = await getDoc(userRef);
// 	if (!userDoc.exists()) return;

// 	const userData = userDoc.data() as DocumentData;
// 	const newCorrect = (userData.stats?.correct || 0) + (correct ? 1 : 0);
// 	const newIncorrect = (userData.stats?.incorrect || 0) + (correct ? 0 : 1);

// 	await setDoc(
// 		userRef,
// 		{
// 			stats: {
// 				correct: newCorrect,
// 				incorrect: newIncorrect
// 			}
// 		},
// 		{ merge: true }
// 	);
// };
