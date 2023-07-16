import type { Genre, Levels } from '$lib/firebase/dataBase.types';
import { getGenreWithLevelForItem, updateUserProgressData } from '$lib/firebase/dataBaseLoadings';
import { getArtistInfo } from '$lib/server/last-fm';
import { getToken, getArtistByGenre, getArtist } from '$lib/server/spotify';
import { LevenshteinDistance } from '$lib/server/utils.js';
import { fail } from '@sveltejs/kit';

// TODO: let user adjust difficulty levels

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('biography') || '{}');
	const genre: Genre = cookies.get('genre') as Genre;
	if (!genre) cookies.set('genre', 'rock', { path: '/' });
	const level: Levels = cookies.get('level') as Levels;
	if (!level) cookies.set('level', 'level1', { path: '/' });

	const spotifyToken = await getToken(cookies);

	let artistName = '';
	let artistId = '';
	let artistBio = '';
	let options: string[] = current_quiz.options || [];

	if (!current_quiz.artist) {
		// get random artist, check if bio is long enough
		const artists = await getArtistByGenre(spotifyToken, genre);
		if ('error' in artists) return { error: "Couldn't get artist" };

		const artist = artists[Math.floor(Math.random() * artists.length)];
		artistName = artist.name;
		artistId = artist.id;

		const artistInfo = await getArtistInfo(artistName);
		if ('error' in artistInfo) return { error: "Couldn't get artist info" };
		artistBio = artistInfo.bio?.summary || '';

		if (level === 'level1') {
			const relatedArtists =
				artistInfo.similar?.artist.map((artist) => artist.name).slice(0, 2) || [];
			options = [artistName, ...relatedArtists].sort(() => Math.random() - 0.5);
		}

		if (level === 'level3') {
			artistBio = artistBio.split('.').slice(0, 2).join('.') + '...';
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
		const artist = await getArtist(spotifyToken, artistId);
		if ('error' in artist) return { error: "Couldn't get artist" };
		artistName = artist.name;
		const artistInfo = await getArtistInfo(artistName);
		if ('error' in artistInfo) return { error: "Couldn't get artist info" };
		artistBio = artistInfo.bio?.summary || '';
	}

	const inputField = '<input />';
	const blurredField = '<b class="blur">Asdfasdf</b>';

	// obfuscate artist name
	artistBio = artistBio.replaceAll(artistName, level === 'level1' ? blurredField : inputField);
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
		const genre: Genre = cookies.get('genre') as Genre;
		const level: Levels = cookies.get('level') as Levels;

		const response = await request.formData();
		const spotifyToken = await getToken(cookies);

		const artist = await getArtist(spotifyToken, artistId);
		if ('error' in artist) return { error: "Couldn't get artist" };
		const artistInfo = await getArtistInfo(artist.name);
		if ('error' in artistInfo) return { error: "Couldn't get artist info" };

		// check if answer is correct
		// filter out empty strings
		const answer = response.getAll('answer').filter((answer) => answer !== '')[0] as string;

		const correctAnswer = LevenshteinDistance(answer.toLowerCase(), artist.name.toLowerCase()) < 3;
		const score = correctAnswer ? 1 : 0;

		let artistBio = artistInfo.bio.summary;
		artistBio = artistBio.replaceAll(artist.name, `<em>${artist.name}</em>`);
		// cut out anchor tags
		artistBio = artistBio.replaceAll(/<a.*<\/a>/g, '');

		// update user stats
		await updateUserProgressData(
			response.get('user_id') as string,
			score,
			genre,
			level,
			'Biography'
		);

		const data = await getGenreWithLevelForItem(response.get('user_id') as string);
		if (data) {
			cookies.set('genre', data.genre, {
				path: '/'
			});
			cookies.set('level', data.level, {
				path: '/'
			});
		}

		// reset quiz
		cookies.set('biography', '', {
			path: '/'
		});

		return fail(200, {
			correct: correctAnswer,
			artist: artist.name,
			image: artist.image,
			bio: artistBio
		});
	}
};
