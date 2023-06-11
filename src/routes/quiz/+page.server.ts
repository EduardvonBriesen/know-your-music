import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { db } from '$lib/firebase/firebase';
import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
import { fail } from '@sveltejs/kit';

type Track = {
	id: string;
	name: string;
	popularity: number;
};

type Artist = {
	id: string;
	name: string;
	images: {
		url: string;
	}[];
};

export const load = async ({ cookies }) => {
	let spotify_token = cookies.get('spotify_token');
	const current_quiz = JSON.parse(cookies.get('current_quiz') || '{}');

	if (!spotify_token) {
		const newToken = await getToken();
		if (!newToken) return fail(500, { message: 'Could not get token' });

		cookies.set('spotify_token', newToken.access_token, {
			path: '/',
			maxAge: newToken.expires_in
		});

		spotify_token = newToken.access_token;
	}

	const artist = await getArtist(spotify_token, current_quiz.artist ?? '4tZwfgrHOc3mvqYlEYSvVi');
	let tracks: Track[] = [];

	if (current_quiz.tracks) {
		const _tracks = await getTracks(spotify_token, current_quiz.tracks ?? []);
		tracks = _tracks.tracks;
	} else {
		let randomTracks = [];

		const topTracks = await getArtistTopTracks(spotify_token, artist.id);
		randomTracks = topTracks.tracks.sort(() => Math.random() - 0.5).slice(0, 3);
		tracks = randomTracks;

		cookies.set(
			'current_quiz',
			JSON.stringify({
				artist: artist.id,
				tracks: tracks.map((track) => track.id)
			}),
			{
				path: '/'
			}
		);
	}

	return {
		artist: {
			name: artist.name,
			image: artist.images[0].url
		},
		tracks: tracks.map((track) => ({
			id: track.id,
			name: track.name
		}))
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		// console.log('request', request.formData());
		const spotify_token = cookies.get('spotify_token');
		if (!spotify_token) return fail(500, { message: 'Could not get token' });
		const current_quiz = JSON.parse(cookies.get('current_quiz') || '{}');

		// evaluate answer
		const answer = await request.formData();
		console.log(answer);

		const tracks = await getTracks(spotify_token, current_quiz.tracks);
		const mostPopularTrack = tracks.tracks.sort((a, b) => b.popularity - a.popularity)[0].id;
		const correct = answer.get('track') === mostPopularTrack;

		// update user
		await updateUser(correct, answer.get('user_id') as string);

		// get new artist
		const relatedArtists = await getRelatedArtists(spotify_token, current_quiz.artist);
		const randomArtist = relatedArtists.artists.sort(() => Math.random() - 0.5).slice(0, 1);
		const artist = randomArtist[0];
		cookies.set(
			'current_quiz',
			JSON.stringify({
				artist: artist.id
			}),
			{
				path: '/'
			}
		);

		if (!correct) {
			return fail(400, { false: answer.get('track'), correct: mostPopularTrack });
		} else {
			return fail(200, { false: null, correct: mostPopularTrack });
		}
	}
};

const updateUser = async (correct: boolean, user_id: string) => {
	const userRef = doc(db, 'users', user_id);
	const userDoc = await getDoc(userRef);
	if (!userDoc.exists()) return;

	const userData = userDoc.data() as DocumentData;
	const newCorrect = (userData.correct || 0) + (correct ? 1 : 0);
	const newIncorrect = (userData.incorrect || 0) + (correct ? 0 : 1);
	const newScore = newCorrect - newIncorrect;

	await setDoc(
		userRef,
		{
			stats: {
				correct: newCorrect,
				incorrect: newIncorrect,
				score: newScore
			}
		},
		{ merge: true }
	);
};

const getToken = async () => {
	const url = 'https://accounts.spotify.com/api/token';
	const body = `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`;

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

const getArtist = async (token: string, id: string): Promise<Artist> => {
	const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

const getArtistTopTracks = async (token: string, id: string): Promise<{ tracks: Track[] }> => {
	const res = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=DE`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

const getRelatedArtists = async (token: string, id: string): Promise<{ artists: Artist[] }> => {
	const res = await fetch(`https://api.spotify.com/v1/artists/${id}/related-artists`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};

const getTracks = async (token: string, ids: string[]): Promise<{ tracks: Track[] }> => {
	const res = await fetch(`https://api.spotify.com/v1/tracks?ids=${ids.join(',')}`, {
		headers: {
			Authorization: 'Bearer  ' + token
		}
	});
	return await res.json();
};
