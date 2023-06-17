import { getRandomArtist } from '$lib/server/last-fm';
import { mbidToSpotifyId } from '$lib/server/music-brainz';
import { getToken, getArtist, getArtistAlbums } from '$lib/server/spotify';

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('discography') || '{}');

	let artistName = current_quiz?.artist?.name;
	let artistId = current_quiz?.artist?.id;
	// let albums = current_quiz?.albums;

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
	const spotifyId = await mbidToSpotifyId(artistId);

	if (!spotifyId) return { error: "Couldn't get Spotify ID" };

	const spotifyArtist = await getArtist(spotifyToken, spotifyId);
	if ('error' in spotifyArtist) return { error: "Couldn't get artist" };
	const artistImage = spotifyArtist.images[0].url;

	const artistAlbums = await getArtistAlbums(spotifyToken, spotifyArtist.id);
	if ('error' in artistAlbums) return { error: "Couldn't get artist albums" };

	return {
		artist: {
			name: artistName,
			image: artistImage
		},
		albums: artistAlbums.items.slice(0,5).map((album) => ({
			name: album.name,
			image: album.images[0].url,
			releaseDate: album.release_date
		}))
	};
};
