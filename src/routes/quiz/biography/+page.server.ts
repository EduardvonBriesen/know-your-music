import { db } from '$lib/firebase/firebase';
import { getArtistInfoById, getRandomArtist } from '$lib/server/last-fm';
import { mbidToSpotifyId } from '$lib/server/music-brainz.js';
import { getArtist as spotifyGetArtist, getToken } from '$lib/server/spotify';
import { fail } from '@sveltejs/kit';
import { doc, getDoc, type DocumentData, setDoc } from 'firebase/firestore';

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('current_quiz') || '{}');

	let artistName = '';
	let artistId = '';

	if (current_quiz.type !== 'biography' || !current_quiz.artist) {
		const artist = await getRandomArtist();
		artistName = artist.name;
		artistId = artist.mbid;

		cookies.set(
			'current_quiz',
			JSON.stringify({
				type: 'biography',
				artist: artistId
			}),
			{
				path: '/'
			}
		);
	} else {
		artistId = current_quiz.artist;
		const artist = await getArtistInfoById(artistId);
		artistName = artist.artist.name;
	}

	let artistBio = (await getArtistInfoById(artistId)).artist.bio.summary;
	// obfuscate artist name
	artistBio = artistBio.replaceAll(artistName, '<input />');
	// cut out anchor tags
	artistBio = artistBio.replaceAll(/<a.*<\/a>/g, '');

	return {
		artist: {
			summary: artistBio
		}
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const artistId = JSON.parse(cookies.get('current_quiz') || '{}').artist;
		const response = await request.formData();

		const artist = await getArtistInfoById(artistId);
		const artistName = artist.artist.name;

		const answer = (response.get('answer') as string) || '';
		const correctAnswer = answer.toLowerCase() === artistName.toLowerCase();

		updateUser(correctAnswer, response.get('user_id') as string);

		const spotifyToken = await getToken(cookies);
		const spotifyId = await mbidToSpotifyId(artistId);
		const spotifyArtist = await spotifyGetArtist(spotifyToken, spotifyId);
		const artistImage = spotifyArtist.images[0].url;

		cookies.set(
			'current_quiz',
			JSON.stringify({
				type: 'biography'
			}),
			{
				path: '/'
			}
		);

		if (correctAnswer) {
			return fail(200, { correct: correctAnswer, artist: artistName, image: artistImage });
		} else {
			return fail(200, { correct: correctAnswer, artist: artistName, image: artistImage });
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
