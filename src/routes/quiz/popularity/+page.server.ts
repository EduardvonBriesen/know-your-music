import { db } from '$lib/firebase/firebase';
import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
import { fail } from '@sveltejs/kit';
import {
	getArtist,
	getArtistTopTracks,
	getRelatedArtists,
	getToken,
	getTracks,
	type Track
} from '$lib/server/spotify';

export const load = async ({ cookies }) => {
	let spotify_token = cookies.get('spotify_token');
	const current_quiz = JSON.parse(cookies.get('current_quiz') || '{}');

	// get new token
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
		const topTracks = await getArtistTopTracks(spotify_token, artist.id);
		const randomTracks = topTracks.tracks.sort(() => Math.random() - 0.5).slice(0, 3);
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
		const spotify_token = cookies.get('spotify_token');
		if (!spotify_token) return fail(500, { message: 'Could not get token' });
		const current_quiz = JSON.parse(cookies.get('current_quiz') || '{}');

		// evaluate answer
		const answer = await request.formData();
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
	const newCorrect = (userData.stats?.correct || 0) + (correct ? 1 : 0);
	const newIncorrect = (userData.stats?.incorrect || 0) + (correct ? 0 : 1);

	await setDoc(
		userRef,
		{
			stats: {
				correct: newCorrect,
				incorrect: newIncorrect
			}
		},
		{ merge: true }
	);
};
