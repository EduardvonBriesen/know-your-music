import type { Genre, Levels } from '$lib/firebase/dataBase.types';
import { updateUserProgressData } from '$lib/firebase/dataBaseLoadings';
import {
	getToken,
	getArtistAlbums,
	getSeveralAlbums,
	getArtistByGenre
} from '$lib/server/spotify';
import type { Album } from '$lib/server/spotify.types';
import { kendallRankCorrelation } from '$lib/server/utils.js';
import { fail } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('discography') || '{}');
	const genre: Genre = cookies.get('genre') as Genre;
	if (!genre) cookies.set('genre', 'rock', { path: '/' });
	const level: Levels = cookies.get('level') as Levels;
	if (!level) cookies.set('level', 'level1', { path: '/' });

	let artistName = current_quiz?.artist?.name;
	let artistId = current_quiz?.artist?.id;
	let artistImage = current_quiz?.artist?.image;
	const albumIds = current_quiz?.albums;

	const spotifyToken = await getToken(cookies);
	if (!current_quiz.artist) {
		// get random artist
		const artists = await getArtistByGenre(spotifyToken, genre);
		if ('error' in artists) return { error: "Couldn't get artist" };
		const artist = artists[Math.floor(Math.random() * artists.length)];

		// assert that artist is valid
		if ('error' in artist) return { error: "Couldn't get artist" };

		artistName = artist.name;
		artistId = artist.id;
		artistImage = artist.image;
	}

	let albums: string[] | Album[] = [];
	if (!albumIds) {
		const artistAlbums = await getArtistAlbums(spotifyToken, artistId);
		if ('error' in artistAlbums) return { error: "Couldn't get artist albums" };

		// Filter out any names that contain the name of another album (gets rid of deluxe editions, etc.)
		const filteredAlbums = artistAlbums.filter((album) => {
			const albumName = album.name.toLowerCase();
			return !artistAlbums.some((otherAlbum) => {
				const otherAlbumName = otherAlbum.name.toLowerCase();
				return albumName.includes(otherAlbumName) && albumName !== otherAlbumName;
			});
		});

		const numberOfAlbums = level === 'level1' ? 3 : level === 'level2' ? 4 : 5;

		// get random albums
		filteredAlbums.sort(() => Math.random() - 0.5);
		albums = filteredAlbums.slice(0, numberOfAlbums);
	} else {
		// get albums from cookie
		const artistAlbums = await getSeveralAlbums(spotifyToken, albumIds);
		if ('error' in artistAlbums) return { error: "Couldn't get artist albums" };

		albums = artistAlbums;
	}

	// save quiz to cookie
	cookies.set(
		'discography',
		JSON.stringify({
			artist: {
				name: artistName,
				id: artistId,
				image: artistImage
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
			image: album.image
		}))
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const albumIds = JSON.parse(cookies.get('discography') || '{}').albums;
		// TODO: hide this from the user
		const genre: Genre = cookies.get('genre') as Genre;
		const level: Levels = cookies.get('level') as Levels;
		const response = await request.formData();

		const albums = await getSeveralAlbums(await getToken(cookies), albumIds);
		if ('error' in albums) return fail(200, {});

		const submittedOrder: string[] = JSON.parse(response.get('answer') as string) || '';

		// get album data in correct order
		const correctOrder = albums
			.map((album) => ({
				id: album.id,
				name: album.name,
				image: album.image,
				release_date: album.release_date
			}))
			.sort((a, b) => a.release_date.localeCompare(b.release_date));

		// get array of correct/incorrect, hashmap of album name to release date
		// TODO: get nicer way to calculate this based on orders
		const result = new Map(
			submittedOrder.map((name, index) => [
				name,
				{
					correct: name === correctOrder[index].name,
					date: correctOrder
						.find((album) => album.name === name)
						?.release_date.split('-')
						.reverse()
						.join('.')
				}
			])
		);

		let score = kendallRankCorrelation(
			submittedOrder.map((name) => correctOrder.findIndex((album) => album.name === name)),
			correctOrder.map((album, index) => index)
		);

		score = score < 0 ? 0 : score;

		// update user stats
		await updateUserProgressData(response.get('user_id') as string, score, genre, level);

		cookies.set('discography', '', {
			path: '/'
		});

		return fail(200, {
			result,
			score
		});
	}
};