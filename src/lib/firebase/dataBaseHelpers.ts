import {
	MAX_HISTORY_LENGTH,
	MAX_HISTORY_GENRE_LENGTH,
	WEIGHT_QUESTIONS_OVERALL,
	WEIGHT_SCORE_OVERALL,
	WEIGHT_SCORE_HISTORY,
	WEIGHT_QUESTIONS_HISTORY
} from './dataBase.types';
import type { UserData, Genre, LevelData, GenreData, GenreScores, ItemTypes } from './dataBase.types';

export function newHistoryArrayElement(date: Date) {
	const newHistory = {
		date: date.toLocaleDateString(),
		accumulated_duration: 0,
		sessions: [
			{
				begin: date,
				duration: 0,
				final_score: 0
			}
		]
	};
	return newHistory;
}

export function newSessionsArrayElement(date: Date) {
	const newSession = {
		begin: date,
		duration: 0,
		final_score: 0
	};
	return newSession;
}

/**
 * Function to determine the genre of the next quetsions
 * @returns {Genre}
 */
export function getGenreForItemtype(data: UserData) {
	const genres: Genre[] = ['rock', 'pop', 'jazz', 'rap', 'classic', 'folk_music'];
	const scores: number[] = [];
	let score = 0;
	let historyLength: number;
	if (data.progress.shortterm_genre_history.current_index === -1) {
		historyLength = data.progress.shortterm_genre_history.list_of_genre.length;
	} else {
		historyLength = MAX_HISTORY_LENGTH;
	}
	for (const genre in genres) {
		const genreData: GenreData = extractRelevantGenreData(data, genre as Genre);
		if (genreData.overallQuestions === 0) {
			// first question ever
			score = Math.random();
		} else if (genreData.overallScore === 0) {
			// no question rightfully answers
			score =
				(WEIGHT_QUESTIONS_OVERALL * genreData.overallGenreQuestions) / genreData.overallQuestions +
				(WEIGHT_QUESTIONS_HISTORY * genreData.currentQuestionsInHistory) / historyLength;
			+0.5 * Math.random();
		} else {
			score =
				(WEIGHT_QUESTIONS_OVERALL * genreData.overallGenreQuestions) / genreData.overallQuestions +
				(WEIGHT_SCORE_OVERALL * genreData.overallGenreScore) / genreData.overallScore +
				WEIGHT_SCORE_HISTORY * genreData.historyGenreScore +
				(WEIGHT_QUESTIONS_HISTORY * genreData.currentQuestionsInHistory) / historyLength +
				0.1 * Math.random();
		}
		scores.push(score);
	}
	return genres[scores.indexOf(Math.min(...scores))];
}

/**
 * Function to determine the level of the next quetsions (of type genre)
 * @returns {string}
 */
export function getLevelForGenre(genreLevelData: LevelData) {
	const level1_score: number = genreLevelData.level1.correct / genreLevelData.level1.questions;
	const level2_score: number = genreLevelData.level2.correct / genreLevelData.level2.questions;
	const level3_score: number = genreLevelData.level3.correct / genreLevelData.level3.questions;
	const diff1_2: number = level1_score - level2_score;
	const diff1_3: number = level1_score - level3_score;
	const diff2_3: number = level2_score - level3_score;

	if (level1_score < 0.2) {
		return 'level1';
	}
	if (level2_score < 0.4) {
		const scores: number[] = [];
		scores.push(Math.random() + level1_score + diff1_2);
		scores.push(Math.random() + level2_score - diff1_2);
		return `level${scores.indexOf(Math.min(...scores)) + 1}`;
	} else {
		const scores: number[] = [];
		scores.push(0.3 * Math.random() + level1_score + 0.5 * diff1_2 + 0.3 * diff1_3);
		scores.push(0.5 * Math.random() + level2_score - 0.5 * diff1_2 + 0.3 * diff2_3);
		scores.push(Math.random() + level3_score - 0.3 * diff1_3 + 0.3 * diff2_3);
		return `level${scores.indexOf(Math.min(...scores)) + 1}`;
	}
}

/**
 * Function to collect genre data of UserData element
 * @returns {GenreData} The sum of the two numbers
 */
export function extractRelevantGenreData(data: UserData, genre: Genre) {
	return {
		overallScore: data.progress.overall_score,
		overallQuestions: data.progress.overall_questions,
		overallGenreScore: data.progress.genre_scores[genre],
		overallGenreQuestions: data.progress.genres[genre].overall_questions,
		historyGenreScore: data.progress.genres[genre].history_score,
		currentQuestionsInHistory: data.progress.shortterm_genre_history.list_of_genre.filter(
			(g) => g === genre
		).length
	};
}

/**
 * Function to calculate updated history list of genres and index of oldest element in list
 * @returns {Genre[], number}
 */
export function getUpdatedHistoryListOfGenres(
	listOfGenre: Genre[],
	index: number,
	newGenre: Genre
) {
	const newListOfGenre: Genre[] = listOfGenre;
	let newIndex = 0;
	if (index === -1) {
		// lesser than MAX_HISTORY_LENGTH questions are answered
		newListOfGenre.push(newGenre);
		if (newListOfGenre.length === MAX_HISTORY_LENGTH) {
			newIndex = 0; //index 0 should be the oldest element
		} else {
			newIndex = -1; //still lesser than MAX_HISTORY_LENGTH questions answered
		}
	} else {
		// MAX_HISTORY_LENGTH are already answered
		newListOfGenre[index] = newGenre;
		if (index === MAX_HISTORY_LENGTH - 1) {
			newIndex = 0;
		} else {
			newIndex = index + 1;
		}
	}
	return {
		list_of_genre: newListOfGenre,
		history_current_index: newIndex
	};
}

export function getUpdatedHistoryListOfItems(
	listOfItems: ItemTypes[],
	index: number,
	newItem: ItemTypes
) {
	const newListOfItems: ItemTypes[] = listOfItems;
	let newIndex = 0;
	if (index === -1) {
		// lesser than MAX_HISTORY_LENGTH questions are answered
		newListOfItems.push(newItem);
		if (newListOfItems.length === MAX_HISTORY_LENGTH) {
			newIndex = 0; //index 0 should be the oldest element
		} else {
			newIndex = -1; //still lesser than MAX_HISTORY_LENGTH questions answered
		}
	} else {
		// MAX_HISTORY_LENGTH are already answered
		newListOfItems[index] = newItem;
		if (index === MAX_HISTORY_LENGTH - 1) {
			newIndex = 0;
		} else {
			newIndex = index + 1;
		}
	}
	return {
		list_of_items: newListOfItems,
		items_index: newIndex
	};
}

export function getUpdatedItemtypeData(
	newPoints: number,
	oldItemScore: number,
	oldItemScores: number[],
	oldItemIndex: number,
	itemQuestions: number,
	MAX_ITEM_HISTORY_LENGTH: number
){
	const newItemScore:number = (oldItemScore*itemQuestions + newPoints)/(itemQuestions+1);
	const newHistoryScores: number[] = oldItemScores;
	let newIndex = -1;
	if (oldItemIndex===-1){
		newHistoryScores.push(newPoints);
		if (newHistoryScores.length===MAX_ITEM_HISTORY_LENGTH){
			newIndex = 0;
		}
	}else{
		newHistoryScores[oldItemIndex] = newPoints;
		newIndex = (oldItemIndex + 1)%MAX_ITEM_HISTORY_LENGTH;
	}
	
	const newHistoryScore  = newHistoryScores.reduce((a, b) => a + b, 0) / newHistoryScores.length;
	
	return {
		item_score: newItemScore,
		item_history_score: newHistoryScore,
		item_history_scores: newHistoryScores,
		item_index: newIndex
	}
}

export function getUpdatedScores(
	oldGenreScores: GenreScores,
	oldScoresHistory: number[],
	oldScoresIndex: number,
	genre: Genre,
	oldGenreLevelCorrect: number,
	genreLevelXCorrect: number,
	genreLevelYCorrect: number,
	genreLevelQuestions: number,
	oldGenreHistoryScoresList: number[],
	oldGenreHistoryScoresListIndex: number,
	newPoints: number
) {
	const newGenreLevelCorrect =
		(oldGenreLevelCorrect * genreLevelQuestions + newPoints) / (genreLevelQuestions + 1);
	const newGenreScore = (newGenreLevelCorrect + genreLevelYCorrect + genreLevelXCorrect) / 3;
	const newGenreScores: GenreScores = oldGenreScores;
	newGenreScores[genre] = newGenreScore;
	const newOverallScore =
		(newGenreScores.rock +
			newGenreScores.pop +
			newGenreScores.classic +
			newGenreScores.folk_music +
			newGenreScores.jazz +
			newGenreScores.rap) /
		6; // sum of all genre scores divide through number of genre
	const newScoresHistory: number[] = oldScoresHistory;
	let newScoresIndex = -1;
	if (oldScoresIndex===-1){
		newScoresHistory.push(newOverallScore);
		if(newScoresHistory.length === MAX_HISTORY_LENGTH) newScoresIndex=0;
	}else{
		newScoresHistory[oldScoresIndex]=newOverallScore;
		newScoresIndex = (oldScoresIndex + 1) % MAX_HISTORY_LENGTH;
	}

	const newGenreHistoryScores: number[] = oldGenreHistoryScoresList;
	let newGenreHistoryScoresIndex = -1;
	if (oldGenreHistoryScoresListIndex === -1) {
		//lesser than MAX_HISTORY_GENRE_LENGTH
		newGenreHistoryScores.push(newPoints);
		if (newGenreHistoryScores.length === MAX_HISTORY_GENRE_LENGTH) {
			newGenreHistoryScoresIndex = 0;
		} // if not oldGenreHistoryScoresListIndex remains -1 as initialized
	} else {
		newGenreHistoryScores[oldGenreHistoryScoresListIndex] = newPoints;
		newGenreHistoryScoresIndex = (oldGenreHistoryScoresListIndex + 1) % MAX_HISTORY_GENRE_LENGTH;
	}
	let sum = 0;
	newGenreHistoryScores.forEach((item) => {
		sum += item;
	});
	const newGenreHistoryScore = sum / newGenreHistoryScores.length;

	return {
		overall_score: newOverallScore,
		list_of_scores:newScoresHistory,
		scores_index: newScoresIndex,
		genre_score: newGenreScore,
		genre_level_correct: newGenreLevelCorrect,
		genre_history_score: newGenreHistoryScore,
		genre_history_scores: newGenreHistoryScores,
		genre_history_scores_index: newGenreHistoryScoresIndex
	};
}
