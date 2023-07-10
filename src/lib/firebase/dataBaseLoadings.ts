import { doc, getDoc, updateDoc, type DocumentData, Firestore } from 'firebase/firestore';
import { MAX_HISTORY_LENGTH } from './dataBase.types';
import type { UserData, Genre, Levels, LevelData } from './dataBase.types';
import {
	newHistoryArrayElement,
	newSessionsArrayElement,
	getGenreForItemtype,
	getLevelForGenre,
	getUpdatedHistoryListOfGenres,
	getUpdatedScores
} from './dataBaseHelpers';

export const saveHistory = async (docName: string, db: Firestore) => {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		try {
			const data = docSnap.data() as UserData;
			const history = data.logs.history;
			const historyLength = history.length;
			const sessions = history[historyLength - 1].sessions;
			const begin: Date = sessions[sessions.length - 1].begin;
			const date = new Date();
			const duration = Math.round(date.valueOf() / 1000) - begin.seconds;
			sessions[sessions.length - 1].duration = duration;
			history[history.length - 1].sessions = sessions;
			const newAccumulateDuration = history[history.length - 1].accumulated_duration + duration;
			history[history.length - 1].accumulated_duration = newAccumulateDuration;
			const overAllDuration = docSnap.data().logs.overall_duration + duration;
			await updateDoc(docRef, {
				'logs.history': history,
				'logs.overall_duration': overAllDuration
			});
		} catch (e) {
			console.error(e);
			return;
		}
	} else {
		// docSnap.data() will be undefined in this case
		console.log('No such document!');
	}
};

export const addNewHistory = async (docName: string, db: Firestore, userData: DocumentData) => {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const dateObject = new Date();
	const date = dateObject.toLocaleDateString();
	const history = userData.logs.history;
	console.log(date.localeCompare(history[history.length - 1].date));
	if (date.localeCompare(history[history.length - 1].date)) {
		//current date is not included in history -> first login this day -> add history
		history.push(newHistoryArrayElement(dateObject));
	} else {
		//current date is already in log -> add only new session
		history[history.length - 1].sessions.push(newSessionsArrayElement(dateObject));
	}
	await updateDoc(docRef, {
		'logs.history': history
	});
};

export const initDataStructure = (name: string, email: string) => {
	const data: UserData = {
		name: name,
		email: email,
		progress: {
			overall_score: 0,
			shortterm_overall_history: {
				MAX_HISTORY_LENGTH: MAX_HISTORY_LENGTH, // proposal =20
				current_index: -1, // index of the oldest element, if overall_questions<20 then index=-1
				list_of_scores:[]
			},//progress.shortterm_overall_history.current_index.list_of_scores
			overall_questions: 0,
			genre_scores: {
				classic: 0,
				rock: 0,
				pop: 0,
				jazz: 0,
				rap: 0,
				folk_music: 0
			},
			music_period_scores: {
				outdated: 0,
				'80s': 0,
				'90s': 0,
				'00s': 0,
				'2020s': 0
			},
			genres: {
				pop: {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				},
				rock: {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				},
				jazz: {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				},
				folk_music: {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				},
				rap: {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				},
				classic: {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				}
			},
			music_periods: {
				outdated: {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				},
				'80s': {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				},
				'90s': {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				},
				'00s': {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				},
				'2020s': {
					level1: {
						correct: 0,
						questions: 0
					},
					level2: {
						correct: 0,
						questions: 0
					},
					level3: {
						correct: 0,
						questions: 0
					},
					history_score: 0,
					history: {
						scores: [],
						index_oldest_score: -1
					},
					overall_questions: 0
				}
			},
			shortterm_genre_history: {
				MAX_HISTORY_LENGTH: MAX_HISTORY_LENGTH, // proposal =20
				current_index: -1, // index of the oldest element, if overall_questions<20 then index=-1
				list_of_genre: [] //list of genres of the last MAX_HISTORY_LENGTH questions
			}
		},
		logs: {
			registered_since: new Date(),
			overall_duration: 0,
			history: [
				{
					date: new Date().toLocaleDateString(),
					accumulated_duration: 0,
					sessions: [
						{
							begin: new Date(),
							duration: 0
						}
					]
				}
			]
		}
	};
	return data;
};

/**
 * Function to determine the genre with a level for the next quetsions
 * @returns {Genre, Levels} //delivers the configuration for a item type
 */
export async function getGenreWithLevelForItem(docName: string, db: Firestore) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}

	const userData = docSnap.data() as UserData;
	const genre: Genre = getGenreForItemtype(userData);

	const genreLevelData: LevelData = userData.progress.genres[genre]; // as LevelData;
	const level: Levels = getLevelForGenre(genreLevelData) as Levels;
	return {
		genre: genre,
		level: level
	};
}

export async function updateUserProgressData(
	db: Firestore,
	docName: string,
	relativePoints: number,
	genre: Genre,
	level: Levels
) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		// docSnap.data() will be undefined in this case
		console.log('No such document!');
	}
	const data: UserData = docSnap.data() as UserData;

	//simple increments
	const overall_questions: number = data.progress.overall_questions + 1;
	const genre_questions: number = data.progress.genres[genre].overall_questions + 1;
	const genre_level_questions: number = data.progress.genres[genre][level].questions + 1;

	const { list_of_genre, history_current_index } = getUpdatedHistoryListOfGenres(
		data.progress.shortterm_genre_history.list_of_genre,
		data.progress.shortterm_genre_history.current_index,
		genre
	);

	let genreLevelXCorrect = 0;
	let genreLevelYCorrect = 0;

	if (level === 'level1') {
		genreLevelXCorrect = data.progress.genres[genre].level2.correct;
		genreLevelYCorrect = data.progress.genres[genre].level3.correct;
	} else if (level === 'level2') {
		genreLevelXCorrect = data.progress.genres[genre].level1.correct;
		genreLevelYCorrect = data.progress.genres[genre].level3.correct;
	} else {
		genreLevelXCorrect = data.progress.genres[genre].level1.correct;
		genreLevelYCorrect = data.progress.genres[genre].level2.correct;
	}

	const {
		overall_score,
		list_of_scores,
		scores_index,
		genre_score,
		genre_level_correct,
		genre_history_score,
		genre_history_scores,
		genre_history_scores_index
	} = getUpdatedScores(
		data.progress.genre_scores,
		data.progress.shortterm_overall_history.list_of_scores,
		data.progress.shortterm_overall_history.current_index,
		genre,
		data.progress.genres[genre][level].correct,
		genreLevelXCorrect,
		genreLevelYCorrect,
		data.progress.genres[genre][level].questions,
		data.progress.genres[genre].history.scores,
		data.progress.genres[genre].history.index_oldest_score,
		relativePoints
	);

	try {
		await updateDoc(docRef, {
			'progress.overall_score': overall_score,
			'progress.shortterm_overall_history.list_of_scores': list_of_scores,
			'progress.shortterm_overall_history.current_index':scores_index,
			'progress.overall_questions': overall_questions,
			[`progress.genre_scores.${genre}`]: genre_score,
			[`progress.genres.${genre}.${level}.questions`]: genre_level_questions,
			[`progress.genres.${genre}.${level}.correct`]: genre_level_correct,
			[`progress.genres.${genre}.overall_questions`]: genre_questions,
			[`progress.genres.${genre}.history_score`]: genre_history_score,
			'progress.shortterm_genre_history.current_index': history_current_index,
			'progress.shortterm_genre_history.list_of_genre': list_of_genre,
			[`progress.genres.${genre}.history.scores`]: genre_history_scores,
			[`progress.genres.${genre}.history.index_oldest_score`]: genre_history_scores_index
		});
	} catch (e) {
		console.error(e);
	}
}
