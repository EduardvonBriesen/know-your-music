import { getSong } from '$lib/server/genius';
import { redis } from '$lib/server/redis';

// TODO: difficulty levels
// TODO: use random song

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('lyrics') || '{}');
	const lineToGuess = parseInt(current_quiz?.lineToGuess || '2');
	const query = current_quiz?.query || {
		title: 'New York State of Mind',
		artist: 'Nas',
		optimizeQuery: true
	};
	let guessOptions = current_quiz?.options || [];

	const { albumArt, lyrics, title } = await getSong(query);

	const lines = getLines(lyrics);

	const revealedLines = lines.slice(0, lineToGuess);

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
			query
		}),
		{
			path: '/'
		}
	);

	return {
		albumArt,
		title,
		revealedLines,
		guessOptions
	};
};

export const actions = {
	default: async ({ cookies, request }) => {
		const current_quiz = JSON.parse(cookies.get('lyrics') || '{}');
		const lineToGuess = parseInt(current_quiz?.lineToGuess || '2');
		const query = current_quiz?.query;

		const answer = await request.formData();
		const guess = answer.get('answer') as string;
		const user_id = answer.get('user_id') as string;

		const { lyrics } = await getSong(query);
		const lines = getLines(lyrics);
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

		cookies.set(
			'lyrics',
			JSON.stringify({
				lineToGuess: lineToGuess + 1,
				options: [],
				query
			}),
			{
				path: '/'
			}
		);

		return {
			result,
			correctLine,
			progress
		};
	}
};

const getLines = (lyrics: string) => {
	let lines = lyrics.split('\n');
	// filter out empty lines
	lines = lines.filter((line) => line.length > 0);
	// filter out lines that are just [Verse] or [Chorus]
	lines = lines.filter((line) => !line.startsWith('['));
	return lines;
};
