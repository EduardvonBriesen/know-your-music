import { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import type { Album, Artist, SpotifyError, Token, Track } from './spotify.types';

const baseUrl = 'https://api.spotify.com/v1/';

export const getToken = async (cookies: Cookies) => {
	let spotify_token = cookies.get('spotify_token');
	// get new token
	if (!spotify_token) {
		const url = new URL('https://accounts.spotify.com/api/token');
		url.searchParams.append('grant_type', 'client_credentials');
		url.searchParams.append('client_id', VITE_SPOTIFY_CLIENT_ID);
		url.searchParams.append('client_secret', VITE_SPOTIFY_CLIENT_SECRET);

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
		const newToken: Token = await res.json();

		cookies.set('spotify_token', newToken.access_token, {
			path: '/',
			maxAge: newToken.expires_in
		});

		spotify_token = newToken.access_token;
	}

	return spotify_token;
};

export const getArtist = async (
	token: string,
	artist_id: string
): Promise<Artist | SpotifyError> => {
	const res = await fetch(`${baseUrl}artists/${artist_id}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

export const getArtistTopTracks = async (
	token: string,
	artist_id: string
): Promise<{ tracks: Track[] } | SpotifyError> => {
	const res = await fetch(`${baseUrl}artists/${artist_id}/top-tracks?market=DE`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

export const getRelatedArtists = async (
	token: string,
	artist_id: string
): Promise<{ artists: Artist[] } | SpotifyError> => {
	const res = await fetch(`${baseUrl}artists/${artist_id}/related-artists`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

export const getTracks = async (
	token: string,
	track_ids: string[]
): Promise<{ tracks: Track[] } | SpotifyError> => {
	const res = await fetch(`${baseUrl}tracks?ids=${track_ids.join(',')}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

export const getArtistAlbums = async (
	token: string,
	artist_id: string
): Promise<{ items: Album[] } | SpotifyError> => {
	const url = new URL(`${baseUrl}artists/${artist_id}/albums`);
	url.searchParams.append('include_groups', 'album');
	const res = await fetch(url, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};
