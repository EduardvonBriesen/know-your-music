import { getLyrics } from '$lib/server/genius';
import type { Options } from '$lib/server/genius.types.js';

export const load = async ({ cookies }) => {
	const options: Options = {
		title: 'The Less I Know The Better',
		artist: 'Tame Impala',
		optimizeQuery: true
	};

	const lyrics = await getLyrics(options);

	const verse = lyrics;

	console.log(verse);

	return {
		verse
	};
};
