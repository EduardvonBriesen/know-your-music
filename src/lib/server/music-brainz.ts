
export const getArtistInfo = async (artist_id: string) => {
	const res = await fetch(`http://musicbrainz.org/ws/2/artist/${artist_id}?inc=url-rels&fmt=json`);
	return await res.json();
};
