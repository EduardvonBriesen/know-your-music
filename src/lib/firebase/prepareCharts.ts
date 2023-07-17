import type { ChartTabularData, GaugeChartOptions, DonutChartOptions, RadarChartOptions, LineChartOptions, BarChartOptions } from "@carbon/charts-svelte";
//import { GaugeTypes, Statuses } from "@carbon/charts/interfaces";
import "@carbon/charts/styles.min.css";
import "carbon-components/css/carbon-components.min.css";

import type {UserData,Genre, Levels, HistoryElement, SessionElement} from './dataBase.types';
import {initDataStructure} from './initDemoUser1';
import {initDataStructure2} from './initDemoUser2'; // in other branch 


export function gaugeChartScores(){
    const genres: Genre[] = ["rock", "classic", "folk_music", "jazz", "rap", "pop"];
    const userData: UserData = initDataStructure("Nick", "nick.demo@de");

    const data: ChartTabularData = [
        {
            "group": "value",
            "value": userData.progress.overall_score*100
        },
        {
            "group": "delta",
            "value": -13.37
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

    return {
        data: data, 
        options:options
    };
}

export function donatChartGenreQuestions(){
    const genres: Genre[] = ["rock", "classic", "folk_music", "jazz", "rap", "pop"];
    const userData: UserData = initDataStructure("Nick", "nick.demo@de");

    const data:ChartTabularData = [
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
            "title": "Bla",
            "resizable": true,
            "donut": {
                "center": {
                    "label": "Overall Questions"
                }
            },
            "height": "400px"
    };

    return {
        data: data, 
        options:options
    };
}

export function radarChartsScores(){
    const genres: Genre[] = ["rock", "classic", "folk_music", "jazz", "rap", "pop"];
    const userData: UserData = initDataStructure("Nick", "nick.demo@de");

    const data: ChartTabularData = [ 
        {
            group: "Overall Score",
            feature: genres[0],
            value: userData.progress.genre_scores[genres[0]]
        },
        {
            group: "History Score",
            feature: genres[0],
            value: userData.progress.genres[genres[0]].history_score
        },
        {
            group: "Overall Score",
            feature: genres[1],
            value: userData.progress.genre_scores[genres[1]]
        },
        {
            group: "History Score",
            feature: genres[1],
            value: userData.progress.genres[genres[1]].history_score
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

    return {
        data: data, 
        options:options
    };
}

 export function lineChartScoresHistory(){
    const genres: Genre[] = ["rock", "classic", "folk_music", "jazz", "rap", "pop"];
    const userData: UserData = initDataStructure("Nick", "nick.demo@de");
    const data: ChartTabularData = [];

    let scoresArray: number[] = userData.progress.shortterm_overall_history.list_of_scores;
    let datasetName= "Overall Score";
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
    scoresArray= userData.progress.itemtypes["Coverguess"].historyScores;
    datasetName= "Itemtype Score - Coverguess";
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

// TBD ->  use the logs with the dates
 export function lineChartTimeBaseScore(){
    const userData: UserData = initDataStructure2();
    
    const historyArray: HistoryElement[] = userData.logs.history
    
    const data: ChartTabularData = [];
    
    for (let itr=0; itr<historyArray.length; itr++ ){
        const newElement = {
            "group": "Overall Score",
            "date": historyArray[itr].sessions[0].begin,
            "value":historyArray[itr].last_score
        };
        console.log(historyArray[itr].sessions[0].begin);
        console.log(itr);
        data.push(newElement);
    }


    const options:LineChartOptions = {
        "title": "Line (dense time series)",
        "axes": {
          "bottom": {
            "title": "Zeit",
            "mapsTo": "date",
            "scaleType": "time"
          },
          "left": {
            "mapsTo": "value",
            "title": "Score",
            "scaleType": "linear"
          }
        },
        "curve": "curveMonotoneX",
        "height": "400px",
        //"theme": "g100"
      };

    return {
        data: data, 
        options:options
    };

}

export function verticalGroupBarGenreLevels(){
    const userData: UserData = initDataStructure("Nick", "nick.demo@de");
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

    const options:BarChartOptions = {
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

export function verticalSimpleBarDurationDay(){   
    const userData: UserData = initDataStructure2();
    const historyArray: HistoryElement[] = userData.logs.history
    
    const data: ChartTabularData = [];
    
    for (let itr=0; itr<historyArray.length; itr++ ){
        const newElement = {
            "group": "Duration in Seconds",
            "date": historyArray[itr].sessions[0].begin,
            "value":historyArray[itr].accumulated_duration
        };
        data.push(newElement);
    }

    const options:BarChartOptions = {
        "title": "Vertical simple bar (time series)",
        "axes": {
          "left": {
            "mapsTo": "value"
          },
          "bottom": {
            "mapsTo": "date",
            "scaleType": "time"
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

export function verticalSimpleBarDurationIntraDay(){   
    const userData: UserData = initDataStructure2();
    const sessionsArray: SessionElement[] = userData.logs.history[0].sessions
    
    const data: ChartTabularData = [];
    
    for (let itr=0; itr<sessionsArray.length; itr++ ){
        const newElement = {
            "group": "Duration in Seconds",
            "date": sessionsArray[itr].begin,
            "value":sessionsArray[itr].duration
        };
        data.push(newElement);
    }

    const options:BarChartOptions = {
        "title": "Vertical simple bar (time series)",
        "axes": {
          "left": {
            "mapsTo": "value"
          },
          "bottom": {
            "mapsTo": "date",
            "scaleType": "time"
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

/** Demo Call in +page.svelte with hard code user
<script>
    const gaugeData = gaugeChartScores();
    const donutData = donatChartGenreQuestions();
    const radarData = radarChartsScores();
    const lineData = lineChartScoresHistory();
    const lineData2 = lineChartTimeBaseScore();
    const simpleBarData = verticalSimpleBarDurationDay();
    const simpleBarData2 = verticalSimpleBarDurationIntraDay();
    const groupBarData = verticalGroupBarGenreLevels();
  
</script>

  <DonutChart data={donutData.data} options={donutData.options}/>
  <RadarChart data={radarData.data} options={radarData.options} />
  <GaugeChart data={gaugeData.data} options={gaugeData.options} />
  <LineChart data={lineData.data} options={lineData.options} />
  <LineChart data={lineData2.data} options={lineData2.options} />
  <BarChartGrouped data={groupBarData.data} options={groupBarData.options} />
  <BarChartSimple data={simpleBarData.data} options={simpleBarData.options} />
  <BarChartSimple data={simpleBarData2.data} options={simpleBarData2.options} />

 */






