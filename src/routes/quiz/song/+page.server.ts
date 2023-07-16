import { fail } from '@sveltejs/kit';
import { getToken, getTrackByGenre, getTracks } from '$lib/server/spotify';
import type { Genre, Levels } from '$lib/firebase/dataBase.types.js';
import {
	getGenreWithLevelForItem,
	updateUserProgressData
} from '$lib/firebase/dataBaseLoadings.js';

// TODO: difficulty levels
export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('song') || '{}');
	const genre: Genre = cookies.get('genre') as Genre;
	if (!genre) cookies.set('genre', 'rock', { path: '/' });
	const level: Levels = cookies.get('level') as Levels;
	if (!level) cookies.set('level', 'level1', { path: '/' });

	let trackId = current_quiz?.trackId;
	let trackPreview = current_quiz?.trackPreview;
	let options = current_quiz?.options;

	const spotifyToken = await getToken(cookies);

	if (!current_quiz.trackPreview) {
		// get new song
		const tracks = await getTrackByGenre(spotifyToken, genre);
		if ('error' in tracks) return { error: "Couldn't get track" };
		const filteredTracks = tracks
			.filter((track) => track.preview_url)
			.sort(() => Math.random() - 0.5);
		if (!filteredTracks.length) return { error: "Couldn't get track" };
		const track = filteredTracks[0];
		console.log(track);

		trackId = track.id;
		trackPreview = track.preview_url;

		// get options
		const alternatives = tracks
			.filter((track) => track.id !== trackId)
			.sort(() => Math.random() - 0.5)
			.slice(0, 2)
			.map((track) => ({ name: track.name, id: track.id }));
		options = [{ name: track.name, id: track.id }, ...alternatives].sort(() => Math.random() - 0.5);

		cookies.set(
			'song',
			JSON.stringify({
				trackId,
				options
			}),
			{ path: '/' }
		);
	}

	return {
		trackPreview,
		options
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const current_quiz = JSON.parse(cookies.get('song') || '{}');
		// TODO: hide this from the user
		const genre: Genre = cookies.get('genre') as Genre;
		const level: Levels = cookies.get('level') as Levels;

		// evaluate answer
		const answer = await request.formData();
		const guess = answer.get('answer') as string;
		let time = answer.get('time') as unknown as number;
		time = Math.round(time / 10) / 100 || 0;

		console.log(guess, time);

		const spotifyToken = await getToken(cookies);

		const tracks = current_quiz.options as { id: string; name: string }[];
		const trackInfos = await getTracks(
			spotifyToken,
			tracks.map((track) => track.id)
		);

		if ('error' in trackInfos) return fail(400, { error: 'Could not get track infos' });

		const correctTrack = trackInfos.find((track) => track.id === current_quiz.trackId);
		if (!correctTrack) return fail(400, { error: 'Could not find correct track' });

		const correct = correctTrack.id === guess;
		const score = correct ? 1 : 0;

		// update user
		await updateUserProgressData(answer.get('user_id') as string, score, genre, level);

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
		cookies.set('song', '', {
			path: '/'
		});

		if (!correct) {
			return fail(400, {
				false: guess,
				correct: correctTrack.name,
				image: correctTrack.image,
				time
			});
		} else {
			return fail(200, {
				false: null,
				correct: correctTrack.name,
				image: correctTrack.image,
				time
			});
		}
	}
};
