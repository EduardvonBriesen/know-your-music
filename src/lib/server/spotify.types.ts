export type Token = {
	access_token: string;
	token_type: string;
	expires_in: number;
};

export type Track = {
	id: string;
	name: string;
	popularity: number;
};

export type Artist = {
	id: string;
	name: string;
	images: {
		url: string;
	}[];
};

export type SpotifyError = {
	error: {
		status: number;
		message: string;
	};
};
