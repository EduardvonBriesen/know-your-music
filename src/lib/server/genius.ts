import * as genius from 'genius-lyrics-api';
import { VITE_GENIUS_KEY } from '$env/static/private';
import type { Options, Song } from './genius.types';
import { redis } from './redis';

export const getLyrics = async (options: Options): Promise<string> => {
	const query = 'genius/getLyrics/' + JSON.stringify(options);
	const cached = await redis.get(query);

	if (cached) return cached;

	const lyrics = await genius.getLyrics({
		apiKey: VITE_GENIUS_KEY,
		...options
	});

	redis.set(query, lyrics, 'EX', 60 * 60 * 24);

	return lyrics;
};

export const getAlbumArt = async (options: Options): Promise<string> => {
	const query = 'genius/getAlbumArt/' + JSON.stringify(options);
	const cached = await redis.get(query);

	if (cached) return cached;

	const albumArt = await genius.getSong({
		apiKey: VITE_GENIUS_KEY,
		...options
	});

	redis.set(query, albumArt, 'EX', 60 * 60 * 24);

	return albumArt;
};

export const getSong = async (options: Options): Promise<Song> => {
	const query = 'genius/getSong/' + JSON.stringify(options);
	const cached = await redis.get(query);

	if (cached) return JSON.parse(cached);

	const song = await genius.getSong({
		apiKey: VITE_GENIUS_KEY,
		...options
	});

	redis.set(query, JSON.stringify(song), 'EX', 60 * 60 * 24);

	return song;
};
