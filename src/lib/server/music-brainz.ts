import { MusicBrainzApi } from 'musicbrainz-api';

export const mbidToSpotifyId = async (mbid: string): Promise<string | undefined> => {
	console.log('mbidToSpotifyId', mbid);
	const mbApi = new MusicBrainzApi({
		appName: 'know your music',
		appVersion: '0.1.0',
		appContactInfo: 'https://test.com' // Or URL to application home page
	});

	const artist = await mbApi.lookupArtist(mbid, ['url-rels']);
	if (!artist || !artist.relations) return;
	const spotifyRel = artist.relations.find((relation) =>
		relation.url?.resource.includes('spotify')
	);
	if (!spotifyRel) return;
	const spotifyUrl = spotifyRel.url?.resource;
	if (!spotifyUrl) return;
	const spotifyId = spotifyUrl.split('/').pop();
	console.log('spotifyId', spotifyId);
	return spotifyId;
};
