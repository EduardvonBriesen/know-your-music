import { getSong } from '$lib/server/genius';

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

		const { lyrics } = await getSong(query);
		const lines = getLines(lyrics);
		const correctLine = lines[lineToGuess];

		const result = correctLine === guess;

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
			correctLine
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
