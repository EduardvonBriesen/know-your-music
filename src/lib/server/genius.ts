import * as genius from 'genius-lyrics-api';
import { VITE_GENIUS_KEY } from '$env/static/private';
import type { Options, Song } from './genius.types';

export const getLyrics = async (options: Options): Promise<string> => {
	const lyrics = await genius.getLyrics({
		apiKey: VITE_GENIUS_KEY,
		...options
	});
	return lyrics;
};

export const getAlbumArt = async (options: Options): Promise<string> => {
	const albumArt = await genius.getSong({
		apiKey: VITE_GENIUS_KEY,
		...options
	});
	return albumArt;
};

export const getSong = async (options: Options): Promise<Song> => {
	const song = await genius.getSong({
		apiKey: VITE_GENIUS_KEY,
		...options
	});
	return song;
};
