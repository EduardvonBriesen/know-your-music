import { VITE_LAST_FM_KEY } from '$env/static/private';

export type ArtistInfo = any;

const baseUrl = 'http://ws.audioscrobbler.com/2.0/';

export const getArtistInfoById = async (artist_id: string): Promise<ArtistInfo> => {
	const url = new URL(baseUrl);
	url.searchParams.append('method', 'artist.getinfo');
	url.searchParams.append('mbid', artist_id);
	url.searchParams.append('api_key', VITE_LAST_FM_KEY);
	url.searchParams.append('format', 'json');
	const res = await fetch(url);
	return await res.json();
};

export const getArtistInfo = async (artist: string): Promise<ArtistInfo> => {
	const url = new URL(baseUrl);
	url.searchParams.append('method', 'artist.getinfo');
	url.searchParams.append('artist', artist);
	url.searchParams.append('api_key', VITE_LAST_FM_KEY);
	url.searchParams.append('format', 'json');
	const res = await fetch(url);
	return await res.json();
};

export const getRandomArtist = async (): Promise<ArtistInfo> => {
	const url = new URL(baseUrl);
	url.searchParams.append('method', 'chart.gettopartists');
	url.searchParams.append('api_key', VITE_LAST_FM_KEY);
	url.searchParams.append('format', 'json');
	const res = await fetch(url);
	const artists = (await res.json()).artists.artist;
	const randomArtist = artists[Math.floor(Math.random() * artists.length)];
	return randomArtist;
};

export const getTopTracks = async (artist_id: string): Promise<any> => {
	const url = new URL(baseUrl);
	url.searchParams.append('method', 'artist.gettoptracks');
	url.searchParams.append('mbid', artist_id);
	url.searchParams.append('api_key', VITE_LAST_FM_KEY);
	url.searchParams.append('format', 'json');
	const res = await fetch(url);
	return await res.json();
};

export const getTrackInfo = async (track: string, artist: string): Promise<any> => {
	const url = new URL(baseUrl);
	url.searchParams.append('method', 'track.getInfo');
	url.searchParams.append('api_key', VITE_LAST_FM_KEY);
	url.searchParams.append('artist', artist);
	url.searchParams.append('track', track);
	url.searchParams.append('format', 'json');
	const res = await fetch(url);
	return await res.json();
};
