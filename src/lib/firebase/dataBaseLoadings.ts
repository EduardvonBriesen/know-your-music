import { doc, getDoc,updateDoc,type DocumentData, Timestamp } from "firebase/firestore";

const MAX_HISTORY_LENGTH: number = 20;
const WEIGHT_QUESTIONS_OVERALL = 1;
const WEIGHT_SCORE_OVERALL = 1.5;
const WEIGHT_SCORE_HISTORY = 4;
const WEIGHT_QUESTIONS_HISTORY = 3.5;



export type UserData = {
    name: string;
    email: string;
    progress: {
      overall_score: number;
      overall_questions: number;
      genre_scores: {
        classic: number;
        rock: number;
        pop: number;
        jazz: number;
        rap: number;
        folk_music: number;
      };
      music_period_scores: {
        outdated: number;
        "80s": number;
        "90s": number;
        "00s": number;
        "2020s": number;
      };
      genres: {
        [genre: string]: {
          levelOne: {
            correct: number;
            questions: number;
          };
          levelTwo: {
            correct: number;
            questions: number;
          };
          levelThree: {
            correct: number;
            questions: number;
          };
          history_score: number; //only the last 10 given answer are considerd
          overall_questions: number;
        };
      };
      music_periods: {
        [period: string]: {
          levelOne: {
            correct: number;
            questions: number;
          };
          levelTwo: {
            correct: number;
            questions: number;
          };
          levelThree: {
            correct: number;
            questions: number;
          };
          overall_questions: number;
        };
      };
      shortterm_genre_history:{
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

type LevelData = {
    levelOne: {
        correct: number;
        questions: number;
    };
    levelTwo: {
        correct: number;
        questions: number;
    };
    levelThree: {
        correct: number;
        questions: number;
    };
    overall_questions: number;
}

export type Genre = "rock" | "pop" | "jazz" | "folk_music" | "classic"| "rap" ;

export type Levels = 1 |2|3;

type GenreData = {
    overallScore: number;
    overallQuestions: number;
    overallGenreScore: number ;
    overallGenreQuestions: number;
    historyGenreScore: number;
    currentQuestionsInHistory: number;

}

export const saveHistory = async (docName: string, db: any)=>{
    const collectionsName = "users";
    const docRef = doc(db, collectionsName, docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        try{
            const data= docSnap.data() as UserData;
            //const history = docSnap.data().logs.history;
            const history = data.logs.history;
            const historyLength = history.length;
            const sessions = history[historyLength-1].sessions
            const begin= sessions[sessions.length-1].begin ;
            const date = new Date();
            const duration = Math.round(date.valueOf()/1000 ) - begin.seconds;
            sessions[sessions.length-1].duration = duration;
            history[history.length-1].sessions = sessions;
            const newAccumulateDuration = history[history.length-1].accumulated_duration + duration;
            history[history.length-1].accumulated_duration = newAccumulateDuration;
            const overAllDuration = docSnap.data().logs.overall_duration + duration;
            await updateDoc(docRef, {
                "logs.history": history,
                "logs.overall_duration" : overAllDuration
            });
        }
        catch(e){
            console.error(e);
            return;
        }
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }


}

export const addNewHistory = async(docName: string, db: any, userData: DocumentData) =>{
    const collectionsName = "users";
    const docRef = doc(db, collectionsName, docName);
    const dateObject = new Date();
    const date = dateObject.toLocaleDateString();
    const history = userData.logs.history;
    console.log(date.localeCompare(history[history.length-1].date));
    if (date.localeCompare(history[history.length-1].date)){
        //current date is not included in history -> first login this day -> add history
        history.push(newHistoryArrayElement(dateObject));
    }else{
        //current date is already in log -> add only new session
        history[history.length-1].sessions.push(newSessionsArrayElement(dateObject));
    }
    await updateDoc(docRef, {
        "logs.history": history
    });
}

const newHistoryArrayElement = (date: Date )=> {
    const newHistory = {
        date: date.toLocaleDateString(),
        accumulated_duration: 0,
        sessions: [
            {
                begin: date,
                duration: 0
            }
        ]
     }
     return newHistory;
}

const newSessionsArrayElement = (date: Date )=> {
    const newSession = {
        begin: date,
        duration:0
     }
     return newSession;
}

export const initDataStructure = (name: string, email: string )=> {
    const data={
        name: name,
        email: email,
        progress: {
            overall_score: 0,
            overall_questions:0,
            genre_scores: {
                classic: 0,
                rock: 0,
                pop: 0,
                jazz: 0,
                rap:0,
                folk_music:0
            },
            music_period_scores: {
                outdated: 0,
                eighties: 0,
                nineties: 0,
                twothousandties: 0,
                charts:0
            },
            genres:{
                pop: {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    history_score: 0, 
                    overall_questions: 0
                },
                rock: {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    history_score: 0, 
                    overall_questions: 0
                },
                jazz: {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    history_score: 0, 
                    overall_questions: 0
                },
                folk_music: {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    history_score: 0, 
                    overall_questions: 0
                },
                rap: {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    history_score: 0, 
                    overall_questions: 0
                },
                classic: {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    history_score: 0, 
                    overall_questions: 0
                }

            },
            music_periods:{
                outdated: {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                "80s": {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                "90s": {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                "00s": {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                "2020s": {
                    levelOne: {
                        correct: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },

            },
            shortterm_genre_history:{
                MAX_HISTORY_LENGTH: MAX_HISTORY_LENGTH, // proposal =20
                current_index: -1, // index of the oldest element, if overall_questions<20 then index=-1
                list_of_genre: [] //list of genres of the last MAX_HISTORY_LENGTH questions
            }
        },
        logs:{
            registered_since: new Date(),
            overall_duration: 0,
            history: [
                {
                    date: (new Date()).toLocaleDateString(),
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
    }
    return data;
}

export async function getGenreWithLevelForItem(docName: string, db: any){
    const collectionsName = "users";
    const docRef = doc(db, collectionsName, docName);
    const docSnap = await getDoc(docRef);
    if(!docSnap.exists()){
        return;
    }

    const userData = docSnap.data() as UserData;
    const genre: Genre = getGenreForItemtype(userData);

    const genreLevelData:LevelData = userData.progress.genres[genre] as LevelData;
    const level:Levels = getLevelForGenre(genreLevelData) as Levels;
    return {
        genre: genre, 
        level: level
    };
}

function getGenreForItemtype(data: UserData){
    const genres: Genre[] = ["rock", "pop", "jazz", "rap", "classic", "folk_music"]
    let scores: number[] = [];
    let score: number = 0;
    let historyLength: number;
    if (data.progress.shortterm_genre_history.current_index===-1){
        historyLength = data.progress.shortterm_genre_history.list_of_genre.length;
    }else{
        historyLength = MAX_HISTORY_LENGTH;
    }
    for (const genre in genres){
        const genreData: GenreData=extractRelevantGenreData(data, genre as Genre);
        if (genreData.overallQuestions===0){ // first question ever
            score = Math.random();
        }else if (genreData.overallScore===0) { // no question rightfully answers 
            score =   WEIGHT_QUESTIONS_OVERALL * genreData.overallGenreQuestions/genreData.overallQuestions
                    + WEIGHT_QUESTIONS_HISTORY * genreData.currentQuestionsInHistory/historyLength;
                    + 0.5*Math.random();
        }else{
            score =   WEIGHT_QUESTIONS_OVERALL * genreData.overallGenreQuestions/genreData.overallQuestions
                    + WEIGHT_SCORE_OVERALL * genreData.overallGenreScore/genreData.overallScore
                    + WEIGHT_SCORE_HISTORY * genreData.historyGenreScore
                    + WEIGHT_QUESTIONS_HISTORY * genreData.currentQuestionsInHistory/historyLength
                    + 0.1*Math.random();
        }
        scores.push(score);   
    }
    return genres[scores.indexOf(Math.min(...scores))];
}

/**
 * Function to determin the level of the next quetsions (of type genre)
 * @returns {Levels} The sum of the two numbers
 */
function getLevelForGenre(genreLevelData: LevelData){
    const level1_score:number = genreLevelData.levelOne.correct/genreLevelData.levelOne.questions;
    const level2_score:number = genreLevelData.levelTwo.correct/genreLevelData.levelTwo.questions;
    const level3_score:number = genreLevelData.levelThree.correct/genreLevelData.levelThree.questions;
    const diff1_2: number = level1_score-level2_score;
    const diff1_3: number = level1_score-level3_score;
    const diff2_3: number = level2_score-level3_score;

    if (level1_score < 0.2){
        return 1;
    }
    if (level2_score < 0.4){
        let scores: number[] = []; 
        scores.push(Math.random()+level1_score+diff1_2);
        scores.push(Math.random()+level2_score-diff1_2);
        return scores.indexOf(Math.min(...scores))+1;
    }else{
        let scores: number[] = []; 
        scores.push(0.3*Math.random()+level1_score+0.5*diff1_2+0.3*diff1_3);
        scores.push(0.5*Math.random()+level2_score-0.5*diff1_2+0.3*diff2_3);
        scores.push(Math.random()+level3_score-0.3*diff1_3+0.3*diff2_3);
        return scores.indexOf(Math.min(...scores))+1;
    }
}


/**
 * Function to collect genre data of UserData element
 * @returns {GenreData} The sum of the two numbers
 */
function extractRelevantGenreData(data: UserData, genre: Genre){
    // const overallScore = data.progress.overall_score;
    // const overallQuestions = data.progress.overall_questions;
    // const overallGenreScore = data.progress.genre_scores[genre];
    // const overallGenreQuestions = data.progress.genres[genre].overall_questions;
    // const historyGenreScore = data.progress.genres[genre].history_score;
    // const currentQuestionsInHistory = data.progress.shortterm_genre_history.list_of_genre.filter((g)=>g===genre).length;
    return{
        overallScore : data.progress.overall_score,
        overallQuestions : data.progress.overall_questions,
        overallGenreScore :  data.progress.genre_scores[genre],
        overallGenreQuestions : data.progress.genres[genre].overall_questions,
        historyGenreScore : data.progress.genres[genre].history_score,
        currentQuestionsInHistory : data.progress.shortterm_genre_history.list_of_genre.filter((g)=>g===genre).length
    }
}

