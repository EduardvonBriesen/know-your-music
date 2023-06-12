import { getArtistInfo as lastFmGetArtistInfo } from '$lib/server/last-fm';
import { getArtistInfo as musicBrainzGetArtistInfo } from '$lib/server/music-brainz';
import { fail } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const artist = 'Cher';
	const artistInfo = await lastFmGetArtistInfo(artist);

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
		const answer = await request.formData();
		// const current_quiz = JSON.parse(cookies.get('current_quiz') || '{}');
		const artist = 'Cher';

		const correctAnswer = answer.get('answer') === artist;
		console.log(answer.get('answer'));

		return fail(200, { correct: correctAnswer, artist: artist });
	}
};
