import type { Firestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import type { UserData, Genre, ScoreType, Levels, ScoreHistoryType, ItemTypes } from "./dataBase.types";
import type {DonutChartOptions,ChartTabularData, RadarChartOptions, GaugeChartOptions, LineChartOptions, BarChartOptions } from '@carbon/charts-svelte';

export async function getGenreQuestionsDonutChart(docName: string, db: Firestore){
	const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;
    const genres: Genre[] = ["rock", "classic", "folk_music", "jazz", "rap", "pop"];

    const data: ChartTabularData = [ 
        {
            group: genres[0],
            value: userData.progress.genres[genres[0]].overall_questions
        },
        {
            group: genres[1],
            value: userData.progress.genres[genres[1]].overall_questions
        },
        {
            group: genres[2],
            value: userData.progress.genres[genres[2]].overall_questions
        },
        {
            group: genres[3],
            value: userData.progress.genres[genres[3]].overall_questions
        },
        {
            group: genres[4],
            value: userData.progress.genres[genres[4]].overall_questions
        },
        {
            group: genres[5],
            value: userData.progress.genres[genres[5]].overall_questions
        }
    ];

    const options: DonutChartOptions = {
        "title": "Blub",
        "resizable": true,
        "donut": {
            "center": {
                "label": "Overall Questions"
            }
        },
        "height": "400px"
    };

    return {data, options};
}

export async function getGenreScoresOverallAndHistoryRadarChart(docName: string, db: Firestore){
    const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;
    const genres: Genre[] = ["rock", "classic", "folk_music", "jazz", "rap", "pop"];

    const data: ChartTabularData = [ 
        {
            group: "Overall Score",
            feature: genres[0],
            value: userData.progress.genre_scores[genres[0]]
        },
        {
            group: "Overall Score",
            feature: genres[1],
            value: userData.progress.genre_scores[genres[1]]
        },
        {
            group: "Overall Score",
            feature: genres[2],
            value: userData.progress.genre_scores[genres[2]]
        },
        {
            group: "Overall Score",
            feature: genres[3],
            value: userData.progress.genre_scores[genres[3]]
        },
        {
            group: "Overall Score",
            feature: genres[4],
            value: userData.progress.genre_scores[genres[4]]
        },
        {
            group: "Overall Score",
            feature: genres[5],
            value: userData.progress.genre_scores[genres[5]]
        },
        {
            group: "History Score",
            feature: genres[0],
            value: userData.progress.genres[genres[0]].history_score
        },
        {
            group: "History Score",
            feature: genres[1],
            value: userData.progress.genres[genres[1]].history_score
        },
        {
            group: "History Score",
            feature: genres[2],
            value: userData.progress.genres[genres[2]].history_score
        },
        {
            group: "History Score",
            feature: genres[3],
            value: userData.progress.genres[genres[3]].history_score
        },
        {
            group: "History Score",
            feature: genres[4],
            value: userData.progress.genres[genres[4]].history_score
        },
        {
            group: "History Score",
            feature: genres[5],
            value: userData.progress.genres[genres[5]].history_score
        }
    ];

    const options:RadarChartOptions = {
        "title": "Genre Scores - Alltime vs. short-term History",
        "radar": {
            "axes": {
                "angle": "feature", //dont change
                "value": "value" // dont change
            }
        },
        "height": "400px"
    };
    return {data, options}
}

export async function getScoreGaugeChart(docName: string, db: Firestore, scoreType:ScoreType ){
    const collectionsName = 'users';
	const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;
    let score = 0;
    let change = +5;
    if(scoreType==='Overall'){
        score = userData.progress.overall_score;
        change = +5; // one moth back
    }else{ // scoreType === 'History'
        score = userData.progress.shortterm_overall_history.score;
        change = +1; // one week back
    }

    const data: ChartTabularData = [
        {
            "group": "value",
            "value": score*100
        },
        {
            "group": "delta",
            "value": change // tbd
        }
    ];

    const options: GaugeChartOptions = {
        "title": "Gauge semicircular -- danger status",
        "resizable": true,
        "height": "250px",
        "width": "100%",
        "gauge": {
          "type": "semi",//GaugeTypes.SEMI,
          "status": 'danger'  // Statuses.DANGER
        },
        //"theme": "g10"
    };

    return {data, options};

}

export async function getLevelGenreVerticalGroupedBarChart(docName: string, db: Firestore){
    const collectionsName = 'users';
    const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;
    const genres: Genre[] = ["rock", "classic", "folk_music", "jazz", "rap", "pop"];
    const levels: Levels[] = ["level1", "level2", "level3"]

    const data: ChartTabularData = [];

    for (const level of levels){
        for (const genre of genres){
            const dataElement = {
                "group": level,
                "key": genre,
                "value": userData.progress.genres[genre][level].correct
            }
            data.push(dataElement);
        }
    }

    const options:BarChartOptions  = {
        "title": "Vertical grouped bar (discrete)",
        "axes": {
            "left": {
                "mapsTo": "value"
            },
            "bottom": {
                "scaleType": "labels",
                "mapsTo": "key"
            }
        },
        "height": "400px",
        //"theme": "g100"
      };

      return {
        data: data, 
        options: options
    };

}

export async function getScoresHistoryLineChart(docName: string, db: Firestore, type: ScoreHistoryType){
    const collectionsName = 'users';
    const docRef = doc(db, collectionsName, docName);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return;
	}
	const userData: UserData = docSnap.data() as UserData;

    const data: ChartTabularData = [];
    let scoresArray: number[] = [];
    let datasetName= "";
    let itr = 1;
    const genres: Genre[] = ["rock", "classic", "folk_music", "jazz", "rap", "pop"];
    const items: ItemTypes[] = ["Biography", "Coverguess", "Discography", "Lyrics", "Popularity"]

    if (type==="Genre"){
        for(const genre of genres){
            scoresArray= userData.progress.genres[genre].history.scores;
            datasetName= `Genre Score - ${genre}`;
            itr = 1;
            for (const score  of scoresArray ){
                const newElement = {
                    "group": datasetName,
                    "key": itr.toString(),
                    "value": score,
                };
                data.push(newElement);
                itr = itr+1;
            }
            itr = 1;
        }
    } else if (type==="Itemtype"){
        for(const item of items){
            scoresArray= userData.progress.itemtypes[item].historyScores
            datasetName= `Itemtype Score - ${item}`;
            itr = 1;
            for (const score  of scoresArray ){
                const newElement = {
                    "group": datasetName,
                    "key": itr.toString(),
                    "value": score,
                };
                data.push(newElement);
                itr = itr+1;
            }
            itr = 1;
        }
    } else {
        scoresArray = userData.progress.shortterm_overall_history.list_of_scores;
        datasetName= "Overall Score";
        let itr = 1;
        for (const score  of scoresArray ){
            const newElement = {
                "group": datasetName,
                "key": itr.toString(),
                "value": score,
            };
            data.push(newElement);
            itr = itr+1;
        }
    }

    const options:LineChartOptions = {
        "title": "Line (discrete)",
        "axes": {
            "bottom": {
                "title": "2019 Annual Sales Figures",
                "mapsTo": "key",
                "scaleType": "labels"
            },
            "left": {
                "mapsTo": "value",
                "title": "Conversion rate",
                "scaleType": "linear"
            }
        },
        "height": "400px",
        //"theme": "g100"    
    };

    return {
        data: data, 
        options:options
    };

}






