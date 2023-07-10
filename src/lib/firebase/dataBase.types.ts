/* Constants */
export const MAX_HISTORY_LENGTH = 20;
export const MAX_HISTORY_GENRE_LENGTH = 10;
export const WEIGHT_QUESTIONS_OVERALL = 1;
export const WEIGHT_SCORE_OVERALL = 1.5;
export const WEIGHT_SCORE_HISTORY = 4;
export const WEIGHT_QUESTIONS_HISTORY = 3.5;

export type UserData = {
	name: string;
	email: string;
	progress: {
		overall_score: number;
		shortterm_overall_history: {
			MAX_HISTORY_LENGTH: number; // proposal =20
			current_index: number; // index of the oldest element, if overall_questions<20 then index=-1
			list_of_scores:number[];
		},
		overall_questions: number;
		genre_scores: GenreScores;
		music_period_scores: {
			outdated: number;
			'80s': number;
			'90s': number;
			'00s': number;
			'2020s': number;
		};
		genres: {
			[genre: string]: historyLevelData;
		};
		music_periods: {
			[period: string]: historyLevelData;
		};
		shortterm_genre_history: {
			MAX_HISTORY_LENGTH: number; // proposal =20
			current_index: number; // index of the oldest element, if overall_questions<20 then index=-1
			list_of_genre: Genre[]; //list of genres of the last HISTORY_LENGTH questions
		};
	};
	logs: {
		registered_since: Date;
		overall_duration: number;
		history: {
			date: string;
			accumulated_duration: number;
			sessions: {
				begin: Date;
				duration: number;
			}[];
		}[];
	};
};

export type Genre = 'rock' | 'pop' | 'jazz' | 'folk_music' | 'classic' | 'rap';

export type Levels = 'level1' | 'level2' | 'level3';

/* Helper functions */
export type LevelData = {
	level1: {
		correct: number;
		questions: number;
	};
	level2: {
		correct: number;
		questions: number;
	};
	level3: {
		correct: number;
		questions: number;
	};
	history_score: number;
	overall_questions: number;
};

export type historyLevelData = LevelData & {
	history: {
		scores: number[];
		index_oldest_score: number;
	};
};

export type GenreData = {
	overallScore: number;
	overallQuestions: number;
	overallGenreScore: number;
	overallGenreQuestions: number;
	historyGenreScore: number;
	currentQuestionsInHistory: number;
};

export type GenreScores = {
	classic: number;
	rock: number;
	pop: number;
	jazz: number;
	rap: number;
	folk_music: number;
};
