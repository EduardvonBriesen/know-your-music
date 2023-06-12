import { VITE_LAST_FM_KEY } from '$env/static/private';

export type ArtistInfo = any;

const baseUrl = 'https://ws.audioscrobbler.com/2.0/';

export const getArtistInfo = async (artist: string): Promise<ArtistInfo> => {
	const res = await fetch(
		`${baseUrl}?method=artist.getinfo&artist=${artist}&api_key=${VITE_LAST_FM_KEY}&format=json`
	);
	return await res.json();
};
