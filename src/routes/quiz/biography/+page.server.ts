import { db } from '$lib/firebase/firebase';
import { getArtistInfoById, getArtistInfo } from '$lib/server/last-fm';
import { fail } from '@sveltejs/kit';
import { doc, getDoc, type DocumentData, setDoc } from 'firebase/firestore';

export const load = async ({ cookies }) => {
	const artist = 'Daft Punk';
	const artistInfo = await getArtistInfo(artist);

	const artistId = artistInfo.artist.mbid;
	let artistBio = artistInfo.artist.bio.summary;
	// obfuscate artist name
	artistBio = artistInfo.artist.bio.summary.replaceAll(artist, '<input />');
	// cut out anchor tags
	artistBio = artistBio.replaceAll(/<a.*<\/a>/g, '');

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

		const answer = response.get('answer') as string;
		const correctAnswer = answer.toLowerCase() === artistName.toLowerCase();

		updateUser(correctAnswer, response.get('user_id') as string);

		if (correctAnswer) {
			return fail(200, { correct: correctAnswer, artist: artistName });
		} else {
			return fail(200, { correct: correctAnswer, artist: artistName });
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
