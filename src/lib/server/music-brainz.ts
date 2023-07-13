import { MusicBrainzApi } from 'musicbrainz-api';
import { redis } from './redis';

export const mbidToSpotifyId = async (mbid: string): Promise<string | undefined> => {
	const query = 'music-brainz/mbid2spotify/' + mbid;
	const cached = await redis.get(query);

	if (cached) return cached;

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
	if (!spotifyId) return;

	redis.set(query, spotifyId, 'EX', 60 * 60 * 24);
	return spotifyId;
};
