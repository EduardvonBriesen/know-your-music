import { VITE_GENIUS_KEY } from '$env/static/private';

export type Options = {
	title: string;
	artist: string;
	optimizeQuery?: boolean; // (optional, default: false) If true, Perform some cleanup to maximize the chance of finding a match
	authHeader?: boolean; // (optional, default: false) Whether to include auth header in the search request
};

export type Song = {
	id: number; // Genius song id
	title: string; // Song title
	url: string; // Genius webpage URL for the song
	lyrics: string; // Song lyrics
	albumArt: string; // URL of the album art image (jpg/png)
};

export type SearchResult = {
	id: number; // Genius song id
	url: string; // Genius webpage URL for the song
	title: string; // Song title
	albumArt: string; // URL of the album art image (jpg/png)
};
