import { fail } from '@sveltejs/kit';
import { getArtistByGenre, getArtistTopTracks, getToken, getTracks } from '$lib/server/spotify';
import type { Genre, Levels } from '$lib/firebase/dataBase.types.js';
import {
	getGenreWithLevelForItem,
	updateUserProgressData
} from '$lib/firebase/dataBaseLoadings.js';

// TODO: difficulty levels
export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('popularity') || '{}');
	const genre: Genre = cookies.get('genre') as Genre;
	if (!genre) cookies.set('genre', 'rock', { path: '/' });
	const level: Levels = cookies.get('level') as Levels;
	if (!level) cookies.set('level', 'level1', { path: '/' });

	let artistName = current_quiz?.artist?.name;
	let artistId = current_quiz?.artist?.id;
	let artistImage = current_quiz?.artist?.image;
	let tracks = current_quiz?.tracks;

	const spotifyToken = await getToken(cookies);

	if (!current_quiz.artist) {
		// get random artist
		const artists = await getArtistByGenre(spotifyToken, genre);
		if ('error' in artists) return { error: "Couldn't get artist" };
		const artist = artists[Math.floor(Math.random() * artists.length)];

		// assert that artist is valid
		if ('error' in artist)
			return {
				error: "Couldn't get artist"
			};

		artistName = artist.name;
		artistId = artist.id;
		artistImage = artist.image;
	}

	if (!current_quiz.tracks) {
		// get random top tracks
		const topTracks = await getArtistTopTracks(spotifyToken, artistId);
		if ('error' in topTracks) return { error: "Couldn't get top track" };
		const randomTracks = topTracks.sort(() => Math.random() - 0.5).slice(0, 3);
		tracks = randomTracks.map((track) => ({
			id: track.id,
			name: track.name
		}));

		cookies.set(
			'popularity',
			JSON.stringify({
				artist: {
					id: artistId,
					name: artistName,
					image: artistImage
				},
				tracks: tracks
			}),
			{
				path: '/'
			}
		);
	}

	return {
		artist: {
			name: artistName,
			image: artistImage
		},
		tracks: tracks
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const current_quiz = JSON.parse(cookies.get('popularity') || '{}');
		// TODO: hide this from the user
		const genre: Genre = cookies.get('genre') as Genre;
		const level: Levels = cookies.get('level') as Levels;

		// evaluate answer
		const answer = await request.formData();
		const guess = answer.get('answer') as string;

		const spotifyToken = await getToken(cookies);

		const tracks = current_quiz.tracks as { id: string; name: string }[];
		const trackInfos = await getTracks(
			spotifyToken,
			tracks.map((track) => track.id)
		);

		if ('error' in trackInfos) return fail(400, { error: 'Could not get track infos' });

		const mostPopularTrack = trackInfos.sort((a, b) => b.popularity - a.popularity)[0];
		const correct = mostPopularTrack.name === guess;
		const score = correct ? 1 : 0;

		// update user
		await updateUserProgressData(
			answer.get('user_id') as string,
			score,
			genre,
			level,
			'Popularity'
		);

		const data = await getGenreWithLevelForItem(answer.get('user_id') as string);
		if (data) {
			cookies.set('genre', data.genre, {
				path: '/'
			});
			cookies.set('level', data.level, {
				path: '/'
			});
		}

		// reset quiz
		cookies.set('popularity', '', {
			path: '/'
		});

		if (!correct) {
			return fail(400, { false: guess, correct: mostPopularTrack.name });
		} else {
			return fail(200, { false: null, correct: mostPopularTrack.name });
		}
	}
};
