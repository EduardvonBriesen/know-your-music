import { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import type { Album, Artist, SpotifyError, Token, Track } from './spotify.types';
import { redis } from './redis';

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
	const query = 'spotify/artist/' + artist_id;
	const cached = await redis.get(query);

	if (cached) return cached;

	const res = await fetch(`${baseUrl}artists/${artist_id}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const artist = await res.json();
	redis.set(query, artist, 'EX', 60 * 60 * 24);

	return artist;
};

export const getArtistTopTracks = async (
	token: string,
	artist_id: string
): Promise<{ tracks: Track[] } | SpotifyError> => {
	const query = 'spotify/artist/top-tracks' + artist_id;
	const cached = await redis.get(query);

	if (cached) return cached;

	const res = await fetch(`${baseUrl}artists/${artist_id}/top-tracks?market=DE`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const topTracks = await res.json();
	redis.set(query, topTracks, 'EX', 60 * 60 * 24);

	return topTracks;
};

export const getRelatedArtists = async (
	token: string,
	artist_id: string
): Promise<{ artists: Artist[] } | SpotifyError> => {
	const query = 'spotify/artist/related-artists' + artist_id;
	const cached = await redis.get(query);

	if (cached) return cached;

	const res = await fetch(`${baseUrl}artists/${artist_id}/related-artists`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const relatedArtists = await res.json();
	redis.set(query, relatedArtists, 'EX', 60 * 60 * 24);

	return relatedArtists;
};

export const getTracks = async (
	token: string,
	track_ids: string[]
): Promise<{ tracks: Track[] } | SpotifyError> => {
	// TODO: cache individual tracks
	const query = 'spotify/tracks/' + JSON.stringify(track_ids);
	const cached = await redis.get(query);

	if (cached) return cached;

	const res = await fetch(`${baseUrl}tracks?ids=${track_ids.join(',')}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const tracks = await res.json();
	redis.set(query, tracks, 'EX', 60 * 60 * 24);

	return await res.json();
};

export const getArtistAlbums = async (
	token: string,
	artist_id: string
): Promise<{ items: Album[] } | SpotifyError> => {
	const query = 'spotify/artist/albums' + artist_id;
	const cached = await redis.get(query);

	if (cached) return cached;

	const url = new URL(`${baseUrl}artists/${artist_id}/albums`);
	url.searchParams.append('include_groups', 'album');
	const res = await fetch(url, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const albums = await res.json();
	redis.set(query, albums, 'EX', 60 * 60 * 24);

	return albums;
};

export const getSeveralAlbums = async (
	token: string,
	album_ids: string[]
): Promise<{ albums: Album[] } | SpotifyError> => {
	// TODO: cache individual albums
	const query = 'spotify/albums/' + JSON.stringify(album_ids);
	const cached = await redis.get(query);

	if (cached) return cached;

	const res = await fetch(`${baseUrl}albums?ids=${album_ids.join(',')}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const albums = await res.json();
	redis.set(query, albums, 'EX', 60 * 60 * 24);

	return albums;
};
