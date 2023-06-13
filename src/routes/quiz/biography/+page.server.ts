import { db } from '$lib/firebase/firebase';
import { getArtistInfoById, getRandomArtist } from '$lib/server/last-fm';
import { mbidToSpotifyId } from '$lib/server/music-brainz.js';
import { getArtist as spotifyGetArtist, getToken } from '$lib/server/spotify';
import { fail } from '@sveltejs/kit';
import { doc, getDoc, type DocumentData, setDoc } from 'firebase/firestore';

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('biography') || '{}');

	let artistName = '';
	let artistId = '';
	let artistBio = '';

	if (!current_quiz.artist) {
		// get random artist, check if bio is long enough
		while (artistBio.length < 10) {
			const artist = await getRandomArtist();
			if ('error' in artist) return { error: "Couldn't get artist" };
			artistName = artist.name;
			artistId = artist.mbid;
			const artistInfo = await getArtistInfoById(artistId);
			if ('error' in artistInfo) return { error: "Couldn't get artist info" };
			artistBio = artistInfo.artist?.bio?.summary || '';
		}

		cookies.set(
			'biography',
			JSON.stringify({
				artist: artistId
			}),
			{
				path: '/'
			}
		);
	} else {
		// get artist from cookie
		artistId = current_quiz.artist;
		const artist = await getArtistInfoById(artistId);
		if ('error' in artist) return { error: "Couldn't get artist" };
		artistName = artist.artist.name;
		const artistInfo = await getArtistInfoById(artistId);
		if ('error' in artistInfo) return { error: "Couldn't get artist info" };
		artistBio = artistInfo.artist?.bio?.summary || '';
	}

	// obfuscate artist name
	artistBio = artistBio.replaceAll(artistName, '<input class="input w-24 px-2" name="answer" />');
	// obfuscate substrings of artist name
	artistName.split(' ').forEach((word) => {
		if (word.length <= 3) return;
		artistBio = artistBio.replaceAll(word, '<b class="blur">Asdfasdf</b>');
	});
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
		const artistId = JSON.parse(cookies.get('biography') || '{}').artist;
		const response = await request.formData();

		const artist = await getArtistInfoById(artistId);
		if ('error' in artist) return fail(500, { error: "Couldn't get artist" });
		const artistName = artist.artist.name;

		// check if answer is correct
		const answer = (response.get('answer') as string) || '';
		const correctAnswer = answer.toLowerCase() === artistName.toLowerCase();

		// update user stats
		updateUser(correctAnswer, response.get('user_id') as string);

		// get artist image
		let artistImage = '';
		const spotifyToken = await getToken(cookies);
		const spotifyId = await mbidToSpotifyId(artistId);
		if (spotifyId) {
			const spotifyArtist = await spotifyGetArtist(spotifyToken, spotifyId);
			if ('error' in spotifyArtist) return ''; // TODO: fallback image
			artistImage = spotifyArtist.images[0].url;
		}

		let artistBio = artist.artist.bio.summary;

		artistBio = artistBio.replaceAll(artistName, `<em>${artistName}</em>`);
		// cut out anchor tags
		artistBio = artistBio.replaceAll(/<a.*<\/a>/g, '');

		// reset quiz
		cookies.set('biography', '', {
			path: '/'
		});

		if (correctAnswer) {
			return fail(200, {
				correct: correctAnswer,
				artist: artistName,
				image: artistImage,
				bio: artistBio
			});
		} else {
			return fail(200, {
				correct: correctAnswer,
				artist: artistName,
				image: artistImage,
				bio: artistBio
			});
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
