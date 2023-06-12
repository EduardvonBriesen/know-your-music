import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export type Token = {
	access_token: string;
	token_type: string;
	expires_in: number;
};

export type Track = {
	id: string;
	name: string;
	popularity: number;
};

export type Artist = {
	id: string;
	name: string;
	images: {
		url: string;
	}[];
};

export const getToken = async () => {
	const url = 'https://accounts.spotify.com/api/token';
	const body = `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`;

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	});
	const token: Token = await res.json();
	return token;
};

export const getArtist = async (token: string, artist_id: string): Promise<Artist> => {
	const res = await fetch(`https://api.spotify.com/v1/artists/${artist_id}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

export const getArtistTopTracks = async (
	token: string,
	artist_id: string
): Promise<{ tracks: Track[] }> => {
	const res = await fetch(`https://api.spotify.com/v1/artists/${artist_id}/top-tracks?market=DE`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

export const getRelatedArtists = async (
	token: string,
	artist_id: string
): Promise<{ artists: Artist[] }> => {
	const res = await fetch(`https://api.spotify.com/v1/artists/${artist_id}/related-artists`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

export const getTracks = async (
	token: string,
	track_ids: string[]
): Promise<{ tracks: Track[] }> => {
	const res = await fetch(`https://api.spotify.com/v1/tracks?ids=${track_ids.join(',')}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};
