import { VITE_LAST_FM_KEY } from '$env/static/private';

export type ArtistInfo = any;

const baseUrl = 'https://ws.audioscrobbler.com/2.0/';

export const getArtistInfoById = async (artist_id: string): Promise<ArtistInfo> => {
	const res = await fetch(
		`${baseUrl}?method=artist.getinfo&mbid=${artist_id}&api_key=${VITE_LAST_FM_KEY}&format=json`
	);
	return await res.json();
};

export const getArtistInfo = async (artist: string): Promise<ArtistInfo> => {
	const res = await fetch(
		`${baseUrl}?method=artist.getinfo&artist=${artist}&api_key=${VITE_LAST_FM_KEY}&format=json`
	);
	return await res.json();
};

export const getRandomArtist = async (): Promise<ArtistInfo> => {
	const res = await fetch(
		`${baseUrl}?method=chart.gettopartists&api_key=${VITE_LAST_FM_KEY}&format=json`
	);
	const artists = (await res.json()).artists.artist;
	const randomArtist = artists[Math.floor(Math.random() * artists.length)];
	return randomArtist;
}