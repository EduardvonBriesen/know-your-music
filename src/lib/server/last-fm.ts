// https://www.last.fm/api/

import { VITE_LAST_FM_KEY } from '$env/static/private';
import type { ArtistInfo, TopTracks, Track, lfmError } from './last-fm.types';
import { redis } from './redis';

const baseUrl = 'http://ws.audioscrobbler.com/2.0/';

export const getArtistInfoById = async (
	artist_id: string
): Promise<{ artist: ArtistInfo } | lfmError> => {
	const query = 'lastfm/artist' + artist_id;
	const cached = await redis.get(query);

	if (cached) return cached;

	const url = new URL(baseUrl);
	url.searchParams.append('method', 'artist.getinfo');
	url.searchParams.append('mbid', artist_id);
	url.searchParams.append('api_key', VITE_LAST_FM_KEY);
	url.searchParams.append('format', 'json');
	const res = await fetch(url);

	const artistInfo = await res.json();
	redis.set(query, artistInfo, 'EX', 60 * 60 * 24);

	return artistInfo;
};

export const getArtistInfo = async (artist: string): Promise<ArtistInfo | lfmError> => {
	const query = 'lastfm/artist/' + artist;
	const cached = await redis.get(query);

	if (cached) return cached;

	const url = new URL(baseUrl);
	url.searchParams.append('method', 'artist.getinfo');
	url.searchParams.append('artist', artist);
	url.searchParams.append('api_key', VITE_LAST_FM_KEY);
	url.searchParams.append('format', 'json');
	const res = await fetch(url);

	const artistInfo = await res.json();
	redis.set(query, artistInfo, 'EX', 60 * 60 * 24);

	return artistInfo;
};

export const getRandomArtist = async (): Promise<ArtistInfo | lfmError> => {
	let artists = [];

	const query = 'lastfm/topartist/';
	const cached = await redis.get(query);

	if (cached) {
		artists = cached;
	} else {
		const url = new URL(baseUrl);
		url.searchParams.append('method', 'chart.gettopartists');
		url.searchParams.append('api_key', VITE_LAST_FM_KEY);
		url.searchParams.append('format', 'json');
		const res = await fetch(url);
		artists = (await res.json()).artists.artist;
		redis.set(query, artists, 'EX', 60 * 60 * 24);
	}

	const randomArtist = artists[Math.floor(Math.random() * artists.length)];
	return randomArtist;
};

export const getTopTracks = async (artist_id: string): Promise<TopTracks | lfmError> => {
	const query = 'lastfm/toptracks/' + artist_id;
	const cached = await redis.get(query);

	if (cached) return cached;

	const url = new URL(baseUrl);
	url.searchParams.append('method', 'artist.gettoptracks');
	url.searchParams.append('mbid', artist_id);
	url.searchParams.append('api_key', VITE_LAST_FM_KEY);
	url.searchParams.append('format', 'json');
	const res = await fetch(url);

	const topTracks = await res.json();
	redis.set(query, topTracks, 'EX', 60 * 60 * 24);

	return topTracks;
};

export const getTrackInfo = async (track: string, artist: string): Promise<Track | lfmError> => {
	const query = 'lastfm/track/' + track + '/' + artist;
	const cached = await redis.get(query);

	if (cached) return cached;

	const url = new URL(baseUrl);
	url.searchParams.append('method', 'track.getInfo');
	url.searchParams.append('api_key', VITE_LAST_FM_KEY);
	url.searchParams.append('artist', artist);
	url.searchParams.append('track', track);
	url.searchParams.append('format', 'json');
	const res = await fetch(url);
	return await res.json();
};
