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

	const { lines, sections } = deconstructLyrics(lyrics);

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
		sections,
		guessOptions,
		totalLines: lines.length
	};
};

export const actions = {
	guess: async ({ cookies, request }) => {
		const current_quiz = JSON.parse(cookies.get('lyrics') || '{}');
		const lineToGuess = parseInt(current_quiz?.lineToGuess || '2');
		const query = current_quiz?.query;

		const answer = await request.formData();
		const guess = answer.get('answer') as string;
		const user_id = answer.get('user_id') as string;

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

		// calculate user score as percentage of correct lines
		const correctLines = Array.from(progress.values()).filter((line) => line).length;
		const incorrectLines = Array.from(progress.values()).filter((line) => !line).length;
		const score = Math.round((correctLines / (correctLines + incorrectLines)) * 100);

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

		let finished = false;

		if (lineToGuess >= lines.length - 1) {
			redis.del(user_id + '-lyrics');
			finished = true;
		} else {
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
		}

		return {
			finished,
			result,
			correctLine,
			progress,
			score
		};
	},
	finish: async ({ cookies }) => {
		cookies.set('lyrics', '', {
			path: '/'
		});

		return {
			finished: false,
			result: false,
			correctLine: '',
			progress: new Map()
		};
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
