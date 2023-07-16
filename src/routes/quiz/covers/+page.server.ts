import type { Genre, Levels } from '$lib/firebase/dataBase.types';
import { getToken, getSeveralAlbums, getArtistByGenre, getArtistAlbums } from '$lib/server/spotify';
import { fail } from '@sveltejs/kit';
import { read, MIME_JPEG } from 'jimp';
import CryptoJS from 'crypto-js';
import { getGenreWithLevelForItem, updateUserProgressData } from '$lib/firebase/dataBaseLoadings';

export const load = async ({ cookies }) => {
	const current_quiz = JSON.parse(cookies.get('covers') || '{}');

	const genre: Genre = cookies.get('genre') as Genre;
	if (!genre) cookies.set('genre', 'rock', { path: '/' });
	const level: Levels = cookies.get('level') as Levels;
	if (!level) cookies.set('level', 'level1', { path: '/' });

	let albumIds = current_quiz?.albums;
	let encryptedAlbumName = current_quiz?.encryptedAlbumName;

	// get spotify token
	const spotifyToken = await getToken(cookies);

	let albums = [];
	let currentAlbumName = '';
	let albumCover = '';

	if (!albumIds) {
		const artists = await getArtistByGenre(spotifyToken, genre);
		if ('error' in artists) return { error: "Couldn't get artist" };
		const artist = artists[Math.floor(Math.random() * artists.length)];

		// get albums
		const artistAlbums = await getArtistAlbums(spotifyToken, artist.id);
		if ('error' in artistAlbums) return { error: "Couldn't get artist albums" };

		// Filter out any names that contain the name of another album (gets rid of deluxe editions, etc.)
		const filteredAlbums = artistAlbums
			.filter((album) => album.album_type === 'album')
			.filter((album) => {
				const albumName = album.name.toLowerCase();
				return !artistAlbums.some((otherAlbum) => {
					const otherAlbumName = otherAlbum.name.toLowerCase();
					return albumName.includes(otherAlbumName) && albumName !== otherAlbumName;
				});
			});

		albums = filteredAlbums.sort(() => Math.random() - 0.5).slice(0, 3);
		albumIds = albums.map((album) => album.id);
		const currentAlbum = albums[Math.floor(Math.random() * albums.length)];
		currentAlbumName = currentAlbum.name;
		albumCover = currentAlbum.image;

		// Encrypt album name
		encryptedAlbumName = CryptoJS.AES.encrypt(currentAlbumName, 'secret key 123').toString();

		// save quiz to cookie
		cookies.set(
			'covers',
			JSON.stringify({
				albums: albumIds,
				encryptedAlbumName // Save encrypted current album name in cookie
			}),
			{
				path: '/'
			}
		);
	} else {
		// get albums from cookie
		const _albums = await getSeveralAlbums(spotifyToken, albumIds);
		if ('error' in _albums) return { error: "Couldn't get artist albums" };
		albums = _albums;

		currentAlbumName = CryptoJS.AES.decrypt(encryptedAlbumName, 'secret key 123').toString(
			CryptoJS.enc.Utf8
		);

		albumCover = albums.find((album) => album.name === currentAlbumName)?.image || '';
	}

	// load and change the cover based on player's level
	const image = await read(albumCover);

	switch (level) {
		case 'level1':
			image.blur(8);
			break;
		case 'level2':
			image.pixelate(50);
			break;
		case 'level3':
			image.pixelate(50);
			image.invert();
			break;
		default:
			break;
	}

	const encryptedCover = await image.getBase64Async(MIME_JPEG);

	return {
		albums: albums.map((album) => ({
			id: album.id,
			name: album.name
		})),
		cover: encryptedCover
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const current_quiz = JSON.parse(cookies.get('covers') || '{}');
		const encryptedAlbumName = current_quiz?.encryptedAlbumName;
		const albumIds = current_quiz?.albums;
		const genre: Genre = cookies.get('genre') as Genre;
		const level: Levels = cookies.get('level') as Levels;

		// Decrypt album name
		const decryptedAlbumName = CryptoJS.AES.decrypt(encryptedAlbumName, 'secret key 123').toString(
			CryptoJS.enc.Utf8
		);

		const spotifyToken = await getToken(cookies);
		const albums = await getSeveralAlbums(spotifyToken, albumIds);
		if ('error' in albums) return { error: "Couldn't get artist albums" };
		const albumCover = albums.find((album) => album.name === decryptedAlbumName)?.image || '';

		// evaluate answer
		const answer = await request.formData();
		const guess = answer.get('answer') as string;
		const user_id = answer.get('user_id') as string;

		// compare answers
		const isCorrect = decryptedAlbumName === guess;
		const score = isCorrect ? 1 : 0;

		// update user
		await updateUserProgressData(user_id, score, genre, level, 'Coverguess');

		const data = await getGenreWithLevelForItem(user_id);
		if (data) {
			cookies.set('genre', data.genre, {
				path: '/'
			});
			cookies.set('level', data.level, {
				path: '/'
			});
		}

		// reset quiz
		cookies.set('covers', '', {
			path: '/'
		});

		if (!isCorrect) {
			return fail(400, { false: guess, correct: decryptedAlbumName, cover: albumCover });
		} else {
			return fail(200, { false: null, correct: decryptedAlbumName, cover: albumCover });
		}
	}
};
