import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { fail } from '@sveltejs/kit';

let tracks: any[] = [];

export const load = async ({ cookies }) => {
	const spotify_token = cookies.get('spotify_token');
	const track_guesses = cookies.get('track_guesses');

	if (!spotify_token) {
		const newToken = await getToken();

		cookies.set('spotify_token', newToken.access_token, {
			path: '/',
			maxAge: newToken.expires_in
		});
	}

	if (!spotify_token) return;

	const artist_id = '1G9G7WwrXka3Z1r7aIDjI7';

	const artist = await getArtist(spotify_token, artist_id);

	const topTracks = await getArtistTopTracks(spotify_token, artist_id);

	const randomTracks = topTracks.tracks.sort(() => Math.random() - 0.5).slice(0, 3);
	tracks = randomTracks;

	return {
		artist: {
			name: artist.name || 'unknown',
			image: artist.images[0].url || 'unknown'
		},
		tracks: randomTracks.map((track) => ({
			id: track.id,
			name: track.name,
			preview: track.preview_url,
			image: track.album.images[0].url
		}))
	};
};

export const actions = {
	default: async ({ request }) => {
		const answer = await request.formData();
		const mostPopularTrack = mostPopular(tracks);
		const correct = answer.get('track') === mostPopularTrack;

		if (!correct) {
			return fail(400, { false: answer.get('track'), correct: mostPopularTrack });
		} else {
			return fail(200, { false: null, correct: mostPopularTrack });
		}
	}
};

const mostPopular = (tracks: any[]) => {
	return tracks.sort((a, b) => b.popularity - a.popularity)[0].id;
};

const getToken = async () => {
	const url = 'https://accounts.spotify.com/api/token';
	const body = `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`;

	console.log('body', body);

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: body
	});
	const token: {
		access_token: string;
		token_type: string;
		expires_in: number;
	} = await res.json();
	return token;
};

const getArtist = async (token: string, id: string) => {
	const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

const getArtistTopTracks = async (token: string, id: string) => {
	const res = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=DE`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};
