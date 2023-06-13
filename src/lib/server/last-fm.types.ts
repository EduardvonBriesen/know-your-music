export type ArtistInfo = {
	name: string;
	mbid: string;
	url: string;
	stats: {
		listeners: number;
		playcount: number;
	};
	bio: {
		summary: string;
		content: string;
	};
};

export type Track = {
	track: {
		name: string;
		url: string;
		duration: string;
		listeners: number;
		playcount: number;
		artist: {
			name: string;
			mbid: string;
			url: string;
		};
	};
};

export type TopTracks = {
	toptracks: {
		track: {
			name: string;
		}[];
	};
};

export type lfmError = {
	error: number;
	message: string;
};
