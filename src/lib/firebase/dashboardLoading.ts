import { doc, getDoc } from 'firebase/firestore';
import type {
	UserData,
	Genre,
	ScoreType,
	Levels,
	ScoreHistoryType,
	ItemTypes,
	ItemGenreType
} from './dataBase.types';
import type { HistoryElement, SessionElement } from './initDemoUser1';
import { db } from './firebase';
import type { ChartTabularData } from '@carbon/charts-svelte';
import { initDataStructure2 } from './initDemoUser2';

export async function getGenreOrItemtypeQuestionsDonutChart(docName: string, type: ItemGenreType) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;
	const genres: Genre[] = ['rock', 'classic', 'folk_music', 'jazz', 'rap', 'pop'];
	const items: ItemTypes[] = ['Biography', 'Coverguess', 'Discography', 'Lyrics', 'Popularity'];

	const data: ChartTabularData = [];

	if (type === 'Genre') {
		for (const genre of genres) {
			const dataElement = {
				group: genre,
				value: userData.progress.genres[genre].overall_questions
			};
			data.push(dataElement);
		}
	} else {
		//type===Itemtype
		for (const item of items) {
			const dataElement = {
				group: item,
				value: userData.progress.itemtypes[item].overallQuestions
			};
			data.push(dataElement);
		}
	}

	return data;
}

export async function getGenreOrItemtypeScoresOverallAndHistoryRadarChart(
	docName: string,
	type: ItemGenreType
) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;
	const genres: Genre[] = ['rock', 'classic', 'folk_music', 'jazz', 'rap', 'pop'];
	const items: ItemTypes[] = ['Biography', 'Coverguess', 'Discography', 'Lyrics', 'Popularity'];

	const data: ChartTabularData = [];
	if (type === 'Genre') {
		for (const genre of genres) {
			let dataElement = {
				group: 'Overall Score',
				feature: genre,
				value: userData.progress.genre_scores[genre]
			};
			data.push(dataElement);
			dataElement = {
				group: 'History Score',
				feature: genre,
				value: userData.progress.genres[genre].history_score
			};
			data.push(dataElement);
		}
	} else {
		//type===Itemtype
		for (const item of items) {
			let dataElement = {
				group: 'Overall Score',
				feature: item,
				value: userData.progress.itemtypes[item].overallScore
			};
			data.push(dataElement);
			dataElement = {
				group: 'History Score',
				feature: item,
				value: userData.progress.itemtypes[item].historyScore
			};
			data.push(dataElement);
		}
	}

	return data;
}

export async function getScoreGaugeChart(docName: string, scoreType: ScoreType) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;
	let score = 0;
	let change = +5;
	if (scoreType === 'Overall') {
		score = userData.progress.overall_score;
		change = +5; // one moth back
	} else {
		// scoreType === 'History'
		score = userData.progress.shortterm_overall_history.score;
		change = +1; // one week back
	}

	const data: ChartTabularData = [
		{
			group: 'value',
			value: score * 100
		},
		{
			group: 'delta',
			value: change // tbd
		}
	];

	return data;
}

export async function getLevelGenreVerticalGroupedBarChart(docName: string) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;
	const genres: Genre[] = ['rock', 'classic', 'folk_music', 'jazz', 'rap', 'pop'];
	const levels: Levels[] = ['level1', 'level2', 'level3'];

	const data: ChartTabularData = [];

	for (const level of levels) {
		for (const genre of genres) {
			const dataElement = {
				group: level,
				key: genre,
				value: userData.progress.genres[genre][level].correct
			};
			data.push(dataElement);
		}
	}

	return data;
}

export async function getScoresHistoryLineChart(docName: string, type: ScoreHistoryType) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;

	const data: ChartTabularData = [];
	let scoresArray: number[] = [];
	let datasetName = '';
	let itr = 1;
	const genres: Genre[] = ['rock', 'classic', 'folk_music', 'jazz', 'rap', 'pop'];
	const items: ItemTypes[] = ['Biography', 'Coverguess', 'Discography', 'Lyrics', 'Popularity'];

	if (type === 'Genre') {
		for (const genre of genres) {
			scoresArray = userData.progress.genres[genre].history.scores;
			datasetName = `Genre Score - ${genre}`;
			itr = 1;
			for (const score of scoresArray) {
				const newElement = {
					group: datasetName,
					key: itr.toString(),
					value: score
				};
				data.push(newElement);
				itr = itr + 1;
			}
			itr = 1;
		}
	} else if (type === 'Itemtype') {
		for (const item of items) {
			scoresArray = userData.progress.itemtypes[item].historyScores;
			datasetName = `Itemtype Score - ${item}`;
			itr = 1;
			for (const score of scoresArray) {
				const newElement = {
					group: datasetName,
					key: itr.toString(),
					value: score
				};
				data.push(newElement);
				itr = itr + 1;
			}
			itr = 1;
		}
	} else {
		scoresArray = userData.progress.shortterm_overall_history.list_of_scores;
		datasetName = 'Overall Score';
		let itr = 1;
		for (const score of scoresArray) {
			const newElement = {
				group: datasetName,
				key: itr.toString(),
				value: score
			};
			data.push(newElement);
			itr = itr + 1;
		}
	}

	return data;
}

// new Charts down here
export async function verticalSimpleBarDurationIntraDay(docName: string) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	// For DEMO Purpose
	//const userData: UserData = docSnap.data() as UserData;
	const userData: UserData = initDataStructure2();

	//for DEMO Purpose the first day of the history is choosen -> TODO day should be parameter
	const sessionsArray: SessionElement[] = userData.logs.history[0].sessions;

	const data: ChartTabularData = [];

	for (let itr = 0; itr < sessionsArray.length; itr++) {
		const newElement = {
			group: 'Duration in Seconds',
			date: sessionsArray[itr].begin,
			value: sessionsArray[itr].duration
		};
		data.push(newElement);
	}

	// const options:BarChartOptions = {
	//     "title": "Vertical simple bar (time series)",
	//     "axes": {
	//       "left": {
	//         "mapsTo": "value"
	//       },
	//       "bottom": {
	//         "mapsTo": "date",
	//         "scaleType": "time"
	//       }
	//     },
	//     "height": "400px",
	//     //"theme": "g100"
	// };
	return data;
}

export async function verticalSimpleBarDurationDay(docName: string) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	// For DEMO Purpose
	// const userData: UserData = docSnap.data() as UserData;
	const userData: UserData = initDataStructure2();

	const historyArray: HistoryElement[] = userData.logs.history;
	const data: ChartTabularData = [];

	for (let itr = 0; itr < historyArray.length; itr++) {
		const newElement = {
			group: 'Duration in Seconds',
			date: historyArray[itr].sessions[0].begin,
			value: historyArray[itr].accumulated_duration/60
		};
		data.push(newElement);
	}

	// const options:BarChartOptions = {
	//     "title": "Vertical simple bar (time series)",
	//     "axes": {
	//       "left": {
	//         "mapsTo": "value"
	//       },
	//       "bottom": {
	//         "mapsTo": "date",
	//         "scaleType": "time"
	//       }
	//     },
	//     "height": "400px",
	//     //"theme": "g100"
	//};
	return data;
}

export async function lineChartTimeBaseScore(docName: string) {
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	// For DEMO Purpose
	// const userData: UserData = docSnap.data() as UserData;
	const userData: UserData = initDataStructure2();

	const historyArray: HistoryElement[] = userData.logs.history;

	const data: ChartTabularData = [];

	for (let itr = 0; itr < historyArray.length; itr++) {
		const newElement = {
			group: 'Overall Score',
			date: historyArray[itr].sessions[0].begin,
			value: historyArray[itr].last_score
		};
		console.log(historyArray[itr].sessions[0].begin);
		console.log(itr);
		data.push(newElement);
	}

	// const options:LineChartOptions = {
	//     "title": "Line (dense time series)",
	//     "axes": {
	//       "bottom": {
	//         "title": "Zeit",
	//         "mapsTo": "date",
	//         "scaleType": "time"
	//       },
	//       "left": {
	//         "mapsTo": "value",
	//         "title": "Score",
	//         "scaleType": "linear"
	//       }
	//     },
	//     "curve": "curveMonotoneX",
	//     "height": "400px",
	//     //"theme": "g100"
	//   };

	return data;
}
