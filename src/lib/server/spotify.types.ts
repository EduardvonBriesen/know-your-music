export type Token = {
	access_token: string;
	token_type: string;
	expires_in: number;
};

export type Track = {
	id: string;
	name: string;
	popularity: number;
	artist: string;
};

export type Artist = {
	id: string;
	name: string;
	image: string;
};

export type Album = {
	id: string;
	name: string;
	image: string;
	release_date: string;
	album_type: string;
};

export type SpotifyError = {
	error: {
		status: number;
		message: string;
	};
};
