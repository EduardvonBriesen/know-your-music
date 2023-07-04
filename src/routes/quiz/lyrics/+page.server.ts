import { getLyrics, getSong } from '$lib/server/genius';
import type { Options } from '$lib/server/genius.types.js';

export const load = async ({ cookies }) => {
	const options: Options = {
		title: 'Stronger',
		artist: 'Ye',
		optimizeQuery: true
	};

	const song = await getSong(options);

	const { albumArt, lyrics, title } = song;

	let lines = lyrics.split('\n');
	// filter out empty lines
	lines = lines.filter((line) => line.length > 0);
	// filter out lines that are just [Verse] or [Chorus]
	lines = lines.filter((line) => !line.startsWith('['));

	const revealedLines = lines.slice(0, 2);

	// TODO: can be improved
	const guessOptions = [
		lines[2],
		lines[Math.floor(Math.random() * lines.length)],
		lines[Math.floor(Math.random() * lines.length)]
	].sort(() => Math.random() - 0.5);

	return {
		albumArt,
		title,
		revealedLines,
		guessOptions
	};
};
