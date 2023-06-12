import { getArtistInfoById, getArtistInfo } from '$lib/server/last-fm';
import { fail } from '@sveltejs/kit';

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
		const answer = (await request.formData()).get('answer') as string;

		const artist = await getArtistInfoById(artistId);
		const artistName = artist.artist.name;

		const correctAnswer = answer.toLowerCase() === artistName.toLowerCase();

		if (correctAnswer) {
			return fail(200, { correct: correctAnswer, artist: artistName });
		} else {
			return fail(200, { correct: correctAnswer, artist: artistName });
		}
	}
};
