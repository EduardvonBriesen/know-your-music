import { db } from '$lib/firebase/firebase';
import { getArtistInfoById, getRandomArtist } from '$lib/server/last-fm';
import { mbidToSpotifyId } from '$lib/server/music-brainz.js';
import { getArtist as spotifyGetArtist, getToken } from '$lib/server/spotify';
import { LevenshteinDistance } from '$lib/server/utils.js';
import { fail } from '@sveltejs/kit';
import { doc, getDoc, type DocumentData, setDoc } from 'firebase/firestore';

// This can be changed to adjust the difficulty of the quiz
const difficulty: 1 | 2 | 3 = 3;

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('biography') || '{}');

	let artistName = '';
	let artistId = '';
	let artistBio = '';
	let options: string[] = current_quiz.options || [];

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

			if (difficulty === 1) {
				const relatedArtists =
					artistInfo.artist?.similar?.artist.map((artist) => artist.name).slice(0, 2) || [];
				options = [artistName, ...relatedArtists].sort(() => Math.random() - 0.5);
			}

			if (difficulty === 3) {
				artistBio = artistBio.split('.').slice(0, 2).join('.') + '...';
			}
		}

		cookies.set(
			'biography',
			JSON.stringify({
				artist: artistId,
				options: options
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

	const inputField = '<input class="input w-24 px-2" name="answer" />';
	const blurredField = '<b class="blur">Asdfasdf</b>';

	// obfuscate artist name
	artistBio = artistBio.replaceAll(artistName, difficulty === 1 ? blurredField : inputField);
	// obfuscate substrings of artist name
	artistName.split(' ').forEach((word) => {
		if (word.length <= 3) return;
		artistBio = artistBio.replaceAll(word, blurredField);
	});
	// cut out anchor tags
	artistBio = artistBio.replaceAll(/<a.*<\/a>/g, '');

	return {
		bio: artistBio,
		options: options
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const artistId = JSON.parse(cookies.get('biography') || '{}').artist;
		const response = await request.formData();

		console.log(response);

		const artist = await getArtistInfoById(artistId);
		if ('error' in artist) return fail(500, { error: "Couldn't get artist" });
		const artistName = artist.artist.name;

		// check if answer is correct
		// filter out empty strings
		const answer = response.getAll('answer').filter((answer) => answer !== '')[0] as string;
		console.log('formData', answer);

		const correctAnswer = LevenshteinDistance(answer.toLowerCase(), artistName.toLowerCase()) < 3;

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
