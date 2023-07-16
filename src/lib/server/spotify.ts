import { VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import type { Album, Artist, SpotifyError, Token, Track } from './spotify.types';
import { redis } from './redis';
import type { Genre } from '$lib/firebase/dataBase.types';

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

	if (cached) return JSON.parse(cached);

	const res = await fetch(`${baseUrl}artists/${artist_id}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const artist = await res.json();
	const filteredArtist: Artist = {
		id: artist.id,
		name: artist.name,
		image: artist.images[0].url
	};
	redis.set(query, JSON.stringify(filteredArtist), 'EX', 60 * 60 * 24);

	return filteredArtist;
};

export const getArtistTopTracks = async (
	token: string,
	artist_id: string
): Promise<Track[] | SpotifyError> => {
	const query = 'spotify/artist/top-tracks' + artist_id;
	const cached = await redis.get(query);

	if (cached) return JSON.parse(cached);

	const res = await fetch(`${baseUrl}artists/${artist_id}/top-tracks?market=DE`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const topTracks = await res.json();
	const filteredTracks: Track[] = topTracks.tracks.map((track: any) => ({
		id: track.id,
		name: track.name,
		popularity: track.popularity,
		preview_url: track.preview_url,
		artist: track.artists[0].name,
		image: track.album.images[0].url
	}));
	redis.set(query, JSON.stringify(filteredTracks), 'EX', 60 * 60 * 24);

	return filteredTracks;
};

export const getRelatedArtists = async (
	token: string,
	artist_id: string
): Promise<Artist[] | SpotifyError> => {
	const query = 'spotify/artist/related-artists' + artist_id;
	const cached = await redis.get(query);

	if (cached) return JSON.parse(cached);

	const res = await fetch(`${baseUrl}artists/${artist_id}/related-artists`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const relatedArtists = await res.json();
	const filteredArtists: Artist[] = relatedArtists.artists.map((artist: any) => ({
		id: artist.id,
		name: artist.name,
		image: artist.images[0].url
	}));

	redis.set(query, JSON.stringify(filteredArtists), 'EX', 60 * 60 * 24);

	return filteredArtists;
};

export const getTracks = async (
	token: string,
	track_ids: string[]
): Promise<Track[] | SpotifyError> => {
	// TODO: cache individual tracks
	const query = 'spotify/tracks/' + JSON.stringify(track_ids);
	const cached = await redis.get(query);

	if (cached) return JSON.parse(cached);

	const res = await fetch(`${baseUrl}tracks?ids=${track_ids.join(',')}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const tracks = await res.json();
	const filteredTracks: Track[] = tracks.tracks.map((track: any) => ({
		id: track.id,
		name: track.name,
		popularity: track.popularity,
		preview_url: track.preview_url,
		artist: track.artists[0].name,
		image: track.album.images[0].url
	}));
	redis.set(query, JSON.stringify(filteredTracks), 'EX', 60 * 60 * 24);

	return filteredTracks;
};

export const getArtistAlbums = async (
	token: string,
	artist_id: string
): Promise<Album[] | SpotifyError> => {
	const query = 'spotify/artist/albums' + artist_id;
	const cached = await redis.get(query);

	if (cached) return JSON.parse(cached);

	const url = new URL(`${baseUrl}artists/${artist_id}/albums`);
	url.searchParams.append('include_groups', 'album');
	const res = await fetch(url, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const albums = await res.json();
	const filteredAlbums: Album[] = albums.items.map((album: any) => ({
		id: album.id,
		name: album.name,
		image: album.images[0].url,
		release_date: album.release_date
	}));

	redis.set(query, JSON.stringify(filteredAlbums), 'EX', 60 * 60 * 24);

	return filteredAlbums;
};

export const getSeveralAlbums = async (
	token: string,
	album_ids: string[]
): Promise<Album[] | SpotifyError> => {
	// TODO: cache individual albums
	const query = 'spotify/albums/' + JSON.stringify(album_ids);
	const cached = await redis.get(query);

	if (cached) return JSON.parse(cached);

	const res = await fetch(`${baseUrl}albums?ids=${album_ids.join(',')}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const albums = await res.json();
	const filteredAlbums: Album[] = albums.albums.map((album: any) => ({
		id: album.id,
		name: album.name,
		image: album.images[0].url,
		release_date: album.release_date
	}));

	redis.set(query, JSON.stringify(filteredAlbums), 'EX', 60 * 60 * 24);

	return filteredAlbums;
};

export const getArtistByGenre = async (
	token: string,
	genre: Genre,
	limit = 20,
	offset = 0
): Promise<Artist[] | SpotifyError> => {
	return getItemByGenre(token, genre, 'artist', limit, offset) as Promise<Artist[] | SpotifyError>;
};

export const getTrackByGenre = async (
	token: string,
	genre: Genre,
	limit = 20,
	offset = 0
): Promise<Track[] | SpotifyError> => {
	return getItemByGenre(token, genre, 'track', limit, offset) as Promise<Track[] | SpotifyError>;
};

export const getItemByGenre = async (
	token: string,
	genre: Genre,
	type: 'artist' | 'track' | 'album',
	limit = 20,
	offset = 0
): Promise<Artist[] | Track[] | Album[] | SpotifyError> => {
	const query = 'spotify/item/genre/' + genre + '/' + type + '/' + limit + '/' + offset;
	const cached = await redis.get(query);

	if (cached) return JSON.parse(cached);

	const url = new URL(`${baseUrl}search`);
	url.searchParams.append('q', 'genre:' + genre);
	url.searchParams.append('type', type);
	url.searchParams.append('limit', limit.toString());
	url.searchParams.append('offset', offset.toString());

	const res = await fetch(url, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});

	const items = await res.json();
	const filteredItems: Artist[] | Track[] | Album[] = items[type + 's'].items.map((item: any) => {
		if (type === 'artist') {
			return {
				id: item.id,
				name: item.name,
				image: item.images[0].url
			};
		}
		if (type === 'track') {
			return {
				id: item.id,
				name: item.name,
				popularity: item.popularity,
				artist: item.artists[0].name,
				preview_url: item.preview_url,
				image: item.album.images[0].url
			};
		}
		if (type === 'album') {
			return {
				id: item.id,
				name: item.name,
				image: item.images[0].url,
				release_date: item.release_date
			};
		}
	});
	redis.set(query, JSON.stringify(filteredItems), 'EX', 60 * 60 * 24);

	return filteredItems;
};
