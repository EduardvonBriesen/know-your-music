import { db } from '$lib/firebase/firebase';
import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
import { fail } from '@sveltejs/kit';
import { getToken, getArtist as spotifyGetArtist } from '$lib/server/spotify';
import { getRandomArtist, getTopTracks, getTrackInfo } from '$lib/server/last-fm';
import { mbidToSpotifyId } from '$lib/server/music-brainz';

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('popularity') || '{}');

	let artistName = current_quiz?.artist?.name;
	let artistId = current_quiz?.artist?.id;
	let tracks = current_quiz?.tracks;

	if (!current_quiz.artist) {
		// get random artist
		const artist = await getRandomArtist();
		artistName = artist.name;
		artistId = artist.mbid;
	}

	if (!current_quiz.tracks) {
		// get random top tracks
		const topTracks = await getTopTracks(artistId);

		if (!topTracks) return fail(500, { message: 'Could not get top tracks' });
		const randomTracks = topTracks.toptracks.track?.sort(() => Math.random() - 0.5).slice(0, 3);
		tracks = randomTracks.map((track) => ({
			name: track?.name
		}));

		cookies.set(
			'popularity',
			JSON.stringify({
				artist: {
					id: artistId,
					name: artistName
				},
				tracks: tracks
			}),
			{
				path: '/'
			}
		);
	}

	let artistImage = '';
	const spotifyToken = await getToken(cookies);
	const spotifyId = await mbidToSpotifyId(artistId);
	if (spotifyId) {
		const spotifyArtist = await spotifyGetArtist(spotifyToken, spotifyId);
		artistImage = spotifyArtist.images[0].url;
	}

	return {
		artist: {
			name: artistName,
			image: artistImage
		},
		tracks: tracks
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const current_quiz = JSON.parse(cookies.get('popularity') || '{}');

		// evaluate answer
		const answer = await request.formData();
		const guess = answer.get('answer') as string;

		const tracks = current_quiz.tracks;
		const trackInfos = await Promise.all(
			tracks.map(async (track) => {
				const info = await getTrackInfo(track.name, current_quiz.artist.name);
				return {
					name: info.track?.name,
					playcount: info.track?.playcount
				};
			})
		);
		const mostPopularTrack = trackInfos.sort((a, b) => b.playcount - a.playcount)[0];
		const correct = mostPopularTrack.name === guess;

		// update user
		await updateUser(correct, answer.get('user_id') as string);

		// reset quiz
		cookies.set('popularity', '', {
			path: '/'
		});

		if (!correct) {
			return fail(400, { false: guess, correct: mostPopularTrack.name });
		} else {
			return fail(200, { false: null, correct: mostPopularTrack.name });
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
