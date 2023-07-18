import type { Genre } from '$lib/firebase/dataBase.types';
import { updateUserProgressData } from '$lib/firebase/dataBaseLoadings';
import { getSong } from '$lib/server/genius';
import { redis } from '$lib/server/redis';
import { getToken, getTrackByGenre } from '$lib/server/spotify';

// TODO: difficulty levels
// TODO: use random song

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('lyrics') || '{}');

	const lineToGuess = parseInt(current_quiz?.lineToGuess || '2');

	const spotifyToken = await getToken(cookies);

	let trackName = current_quiz?.track?.name;
	let trackArtist = current_quiz?.track?.artist;

	if (!current_quiz.track) {
		const genre: Genre = cookies.get('genre') as Genre;
		if (!genre) cookies.set('genre', 'rock', { path: '/' });

		const tracks = await getTrackByGenre(spotifyToken, genre);
		if ('error' in tracks) return { error: "Couldn't get track" };
		const track = tracks[Math.floor(Math.random() * tracks.length)];
		trackArtist = track.artist;
		trackName = track.name;
	}
	const query = {
		title: trackName,
		artist: trackArtist,
		optimizeQuery: true
	};

	const { albumArt, lyrics, title } = await getSong(query);

	const { lines, sections } = deconstructLyrics(lyrics);

	const revealedLines = lines.slice(0, lineToGuess);

	let guessOptions = current_quiz?.options || [];
	if (guessOptions.length === 0) {
		// TODO: can be improved
		guessOptions = [
			lines[lineToGuess],
			lines[Math.floor(Math.random() * lines.length)],
			lines[Math.floor(Math.random() * lines.length)]
		].sort(() => Math.random() - 0.5);
	}

	cookies.set(
		'lyrics',
		JSON.stringify({
			lineToGuess,
			options: guessOptions,
			track: {
				name: trackName,
				artist: trackArtist
			}
		}),
		{
			path: '/'
		}
	);

	return {
		albumArt,
		title,
		revealedLines,
		sections,
		guessOptions,
		totalLines: lines.length
	};
};

export const actions = {
	guess: async ({ cookies, request }) => {
		const current_quiz = JSON.parse(cookies.get('lyrics') || '{}');
		const lineToGuess = parseInt(current_quiz?.lineToGuess);
		const track = current_quiz?.track;
		const genre: Genre = cookies.get('genre') as Genre;

		const answer = await request.formData();
		const guess = answer.get('answer') as string;
		const user_id = answer.get('user_id') as string;

		const query = {
			title: track.name,
			artist: track.artist,
			optimizeQuery: true
		};

		const { lyrics } = await getSong(query);
		const { lines } = deconstructLyrics(lyrics);
		const correctLine = lines[lineToGuess];
		const result = correctLine === guess;

		// update user progress in redis
		// TODO: improve checking if user progress exists
		const userProgress = await redis.get(user_id + '-lyrics');
		let progress: Map<number, boolean>;
		if (userProgress && userProgress.length > 0) {
			progress = new Map(JSON.parse(userProgress));
		} else {
			progress = new Map();
		}
		progress.set(lineToGuess, result);
		redis.set(user_id + '-lyrics', JSON.stringify(Array.from(progress.entries())));

		let finished = false;
		let score = 0;
		if (lineToGuess >= lines.length - 1) {
			// calculate user score as percentage of correct lines
			const correctLines = Array.from(progress.values()).filter((line) => line).length;
			const incorrectLines = Array.from(progress.values()).filter((line) => !line).length;
			score = Math.round((correctLines / (correctLines + incorrectLines)) * 100) || 0;
			redis.del(user_id + '-lyrics');

			await updateUserProgressData(
				answer.get('user_id') as string,
				score / 100,
				genre,
				'level2',
				'Lyrics'
			);

			finished = true;
		} else {
			cookies.set(
				'lyrics',
				JSON.stringify({
					lineToGuess: lineToGuess + 1,
					options: [],
					track
				}),
				{
					path: '/'
				}
			);
		}

		return {
			finished,
			result,
			progress,
			score
		};
	},
	forfeit: async ({ request, cookies }) => {
		const answer = await request.formData();
		const user_id = answer.get('user_id') as string;
		const genre: Genre = cookies.get('genre') as Genre;

		const userProgress = await redis.get(user_id + '-lyrics');
		const progress = new Map(JSON.parse(userProgress || '[]'));
		redis.del(user_id + '-lyrics');

		// calculate user score as percentage of correct lines
		const correctLines = Array.from(progress.values()).filter((line) => line).length;
		const incorrectLines = Array.from(progress.values()).filter((line) => !line).length;
		const score = Math.round((correctLines / (correctLines + incorrectLines)) * 100) || 0;

		await updateUserProgressData(
			answer.get('user_id') as string,
			score / 100,
			genre,
			'level2',
			'Lyrics'
		);

		return {
			finished: true,
			progress,
			score
		};
	},
	finish: async ({ cookies }) => {
		cookies.set('lyrics', '', {
			path: '/'
		});
		return;
	}
};

const deconstructLyrics = (
	lyrics: string
): { lines: string[]; sections: { [key: number]: string } } => {
	let lines = lyrics.split('\n');
	// filter out empty lines
	lines = lines.filter((line) => line.length > 0);

	// Sections key denote before which line a section starts
	const sections: { [key: number]: string } = {};
	const filteredLines = [];
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].startsWith('[')) {
			sections[filteredLines.length] = lines[i];
		} else {
			filteredLines.push(lines[i]);
		}
	}

	return { lines: filteredLines, sections };
};
