import { MusicBrainzApi } from 'musicbrainz-api';

export const mbidToSpotifyId = async (mbid: string): Promise<string> => {
	const mbApi = new MusicBrainzApi({
		appName: 'know your music',
		appVersion: '0.1.0',
		appContactInfo: 'https://test.com' // Or URL to application home page
	});

	const artist = await mbApi.lookupArtist(mbid, ['url-rels']);
	if (!artist) return '';
	const spotifyUrl = artist.relations.find((relation) => relation.url.resource.includes('spotify'))
		.url.resource;
	const spotifyId = spotifyUrl.split('/').pop();
	return spotifyId || '';
};
