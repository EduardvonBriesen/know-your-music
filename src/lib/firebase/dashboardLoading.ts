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
import {
	type DonutChartOptions,
	type ChartTabularData,
	type RadarChartOptions,
	type GaugeChartOptions,
	type LineChartOptions,
	type BarChartOptions,
	Alignments
} from '@carbon/charts-svelte';
import { db } from './firebase';

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

	const options: DonutChartOptions = {
		title: 'Blub',
		resizable: true,
		donut: {
			alignment: Alignments.CENTER,
			center: {
				label: 'Overall Questions'
			}
		},
		height: '100%'
	};

	return { data, options };
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

	const options: RadarChartOptions = {
		title: 'Genre Scores - Alltime vs. short-term History',
		radar: {
			axes: {
				angle: 'feature', //dont change
				value: 'value' // dont change
			}
		}
	};
	return { data, options };
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

	const options: GaugeChartOptions = {
		title: 'Gauge semicircular -- danger status',
		resizable: true,
		height: '250px',
		width: '100%',
		gauge: {
			type: 'semi', //GaugeTypes.SEMI,
			status: 'danger' // Statuses.DANGER
		}
		//"theme": "g10"
	};

	return { data, options };
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

	const options: BarChartOptions = {
		title: 'Vertical grouped bar (discrete)',
		axes: {
			left: {
				mapsTo: 'value'
			},
			bottom: {
				scaleType: 'labels',
				mapsTo: 'key'
			}
		}
		//"theme": "g100"
	};

	return {
		data: data,
		options: options
	};
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

	const options: LineChartOptions = {
		title: 'Line (discrete)',
		axes: {
			bottom: {
				title: '2019 Annual Sales Figures',
				mapsTo: 'key',
				scaleType: 'labels'
			},
			left: {
				mapsTo: 'value',
				title: 'Conversion rate',
				scaleType: 'linear'
			}
		}
		// "height": "400px",
		//"theme": "g100"
	};

	return {
		data: data,
		options: options
	};
}
