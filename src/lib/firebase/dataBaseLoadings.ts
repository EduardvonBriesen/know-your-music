import { doc, getDoc,updateDoc,type DocumentData} from "firebase/firestore";

/* Constants */
const MAX_HISTORY_LENGTH = 20;
const MAX_HISTORY_GENRE_LENGTH = 5;
const WEIGHT_QUESTIONS_OVERALL = 1;
const WEIGHT_SCORE_OVERALL = 1.5;
const WEIGHT_SCORE_HISTORY = 4;
const WEIGHT_QUESTIONS_HISTORY = 3.5;


/* Exports */
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
          level1:{
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
          history: {
            scores: number[];
            index_oldest_score: number;
          }
          history_score: number; //only the last 10 given answer are considerd
          overall_questions: number;
        };
      };
      music_periods: {
        [period: string]: {
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
          history: {
            scores: number[];
            index_oldest_score: number;
          }
          history_score: number; //only the last 10 given answer are considerd
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
}

export type Genre = "rock" | "pop" | "jazz" | "folk_music" | "classic"| "rap" ;

export type Levels = "level1"|"level2"|"level3";

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
            const begin = sessions[sessions.length-1].begin;
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
            music_periods:{
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
                "80s": {
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
                "90s": {
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
                "00s": {
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
                "2020s": {
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

/**
 * Function to determine the genre with a level for the next quetsions
 * @returns {Genre, Levels} //delivers the configuration for a item type
 */
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

export async function updateUserProgressData(db: any, docName: string, relativePoints: number, genre: Genre, level: Levels){
    const collectionsName = "users";
    const docRef = doc(db, collectionsName, docName);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
    const data: UserData= docSnap.data() as UserData;

    //simple increments
    const overall_questions: number = data.progress.overall_questions+1;
    const genre_questions: number = data.progress.genres[genre].overall_questions+1;
    const genre_level_questions: number = data.progress.genres[genre][level].questions+1;

    const{list_of_genre, history_current_index} = getUpdatedHistoryListOfGenres(
        data.progress.shortterm_genre_history.list_of_genre, 
        data.progress.shortterm_genre_history.current_index, genre
    );

    let genreLevelXCorrect= 0;
    let genreLevelYCorrect= 0;

    if (level==="level1"){
        genreLevelXCorrect = data.progress.genres[genre].level2.correct;
        genreLevelYCorrect= data.progress.genres[genre].level3.correct;
    }else if (level==="level2"){
        genreLevelXCorrect= data.progress.genres[genre].level1.correct;
        genreLevelYCorrect= data.progress.genres[genre].level3.correct;
    }else{
        genreLevelXCorrect = data.progress.genres[genre].level1.correct;
        genreLevelYCorrect = data.progress.genres[genre].level2.correct;
    }

    const {overall_score, genre_score, genre_level_correct, genre_history_score, genre_history_scores, genre_history_scores_index} 
    = getUpdatedScore(
            data.progress.genre_scores,
            genre,
            data.progress.genres[genre][level].correct,
            genreLevelXCorrect,
            genreLevelYCorrect,
            data.progress.genres[genre][level].questions,
            data.progress.genres[genre].history.scores,
            data.progress.genres[genre].history.index_oldest_score,
            relativePoints
    );
    
    try{
        await updateDoc(docRef, {
                "progress.overall_score": overall_score,
                "progress.overall_questions" : overall_questions,
                [`progress.genre_scores.${genre}`]: genre_score,
                [`progress.genres.${genre}.${level}.questions`] : genre_level_questions,
                [`progress.genres.${genre}.${level}.correct`] : genre_level_correct,
                [`progress.genres.${genre}.overall_questions`] : genre_questions,
                [`progress.genres.${genre}.history_score`] : genre_history_score,
                "progress.shortterm_genre_history.current_index" : history_current_index,
                "progress.shortterm_genre_history.list_of_genre" : list_of_genre,
                [`progress.genres.${genre}.history.scores`] : genre_history_scores,
                [`progress.genres.${genre}.history.index_oldest_score`]: genre_history_scores_index
        });
    }catch(e){
        console.error(e);
    }

} 

/* Helper functions */
type LevelData = {
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
    overall_questions: number;
}

type GenreData = {
    overallScore: number;
    overallQuestions: number;
    overallGenreScore: number ;
    overallGenreQuestions: number;
    historyGenreScore: number;
    currentQuestionsInHistory: number;

}
type GenreScores ={
    classic: number;
    rock: number;
    pop: number;
    jazz: number;
    rap: number;
    folk_music: number;
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

/**
 * Function to determine the genre of the next quetsions
 * @returns {Genre} 
 */
function getGenreForItemtype(data: UserData){
    const genres: Genre[] = ["rock", "pop", "jazz", "rap", "classic", "folk_music"]
    const scores: number[] = [];
    let score = 0;
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
 * Function to determine the level of the next quetsions (of type genre)
 * @returns {Levels}
 */
function getLevelForGenre(genreLevelData: LevelData){
    const level1_score:number = genreLevelData.level1.correct/genreLevelData.level1.questions;
    const level2_score:number = genreLevelData.level2.correct/genreLevelData.level2.questions;
    const level3_score:number = genreLevelData.level3.correct/genreLevelData.level3.questions;
    const diff1_2: number = level1_score-level2_score;
    const diff1_3: number = level1_score-level3_score;
    const diff2_3: number = level2_score-level3_score;

    if (level1_score < 0.2){
        return "level1";
    }
    if (level2_score < 0.4){
        const scores: number[] = []; 
        scores.push(Math.random()+level1_score+diff1_2);
        scores.push(Math.random()+level2_score-diff1_2);
        return `level${scores.indexOf(Math.min(...scores))+1}`;
    }else{
        const scores: number[] = []; 
        scores.push(0.3*Math.random()+level1_score+0.5*diff1_2+0.3*diff1_3);
        scores.push(0.5*Math.random()+level2_score-0.5*diff1_2+0.3*diff2_3);
        scores.push(Math.random()+level3_score-0.3*diff1_3+0.3*diff2_3);
        return `level${scores.indexOf(Math.min(...scores))+1}`;
    }
}

/**
 * Function to collect genre data of UserData element
 * @returns {GenreData} The sum of the two numbers
 */
function extractRelevantGenreData(data: UserData, genre: Genre){
    return{
        overallScore : data.progress.overall_score,
        overallQuestions : data.progress.overall_questions,
        overallGenreScore :  data.progress.genre_scores[genre],
        overallGenreQuestions : data.progress.genres[genre].overall_questions,
        historyGenreScore : data.progress.genres[genre].history_score,
        currentQuestionsInHistory : data.progress.shortterm_genre_history.list_of_genre.filter((g)=>g===genre).length
    }
}

/**
 * Function to calculate updated history list of genres and index of oldest element in list
 * @returns {Genre[], number} 
 */
function getUpdatedHistoryListOfGenres(listOfGenre: Genre[], index: number, newGenre: Genre){
    const newListOfGenre: Genre[] = listOfGenre;
    let newIndex = 0;
    if (index===-1){ // lesser than MAX_HISTORY_LENGTH questions are answered
        newListOfGenre.push(newGenre);
        if(newListOfGenre.length === MAX_HISTORY_LENGTH){
            newIndex = 0; //index 0 should be the oldest element
        }else{
            newIndex = -1; //still lesser than MAX_HISTORY_LENGTH questions answered
        }
    }else{ // MAX_HISTORY_LENGTH are already answered
        newListOfGenre[index] = newGenre;
        if(index===MAX_HISTORY_LENGTH-1){
            newIndex=0;
        }else{
            newIndex=index+1;
        }
    }
    return{
        list_of_genre: newListOfGenre, 
        history_current_index: newIndex
    };
}

function getUpdatedScore(   oldGenreScores: GenreScores, 
                            genre: Genre,
                            oldGenreLevelCorrect:number, 
                            genreLevelXCorrect:number,
                            genreLevelYCorrect:number, 
                            genreLevelQuestions:number, 
                            oldGenreHistoryScoresList: number[],
                            oldGenreHistoryScoresListIndex:number, 
                            newPoints:number,
                            ){
    
    const newGenreLevelCorrect= (oldGenreLevelCorrect*genreLevelQuestions+newPoints)/(genreLevelQuestions+1);
    const newGenreScore = (newGenreLevelCorrect+genreLevelYCorrect+genreLevelXCorrect)/3;
    const newGenreScores: GenreScores = oldGenreScores;
    newGenreScores[genre]=newGenreScore;
    const newOverallScore = ( newGenreScores.rock + newGenreScores.pop +
                                    newGenreScores.classic + newGenreScores.folk_music +
                                    newGenreScores.jazz + newGenreScores.rap)/6; // sum of all genre scores divide through number of genre
    
    const newGenreHistoryScores:number[] = oldGenreHistoryScoresList;
    let newGenreHistoryScoresIndex =-1;
    if(oldGenreHistoryScoresListIndex===-1){ //lesser than MAX_HISTORY_GENRE_LENGTH
        newGenreHistoryScores.push(newPoints);
        if(newGenreHistoryScores.length === MAX_HISTORY_GENRE_LENGTH){
            newGenreHistoryScoresIndex=0;
        }// if not oldGenreHistoryScoresListIndex remains -1 as initialized
    }else{
        newGenreHistoryScores[oldGenreHistoryScoresListIndex] = newPoints;
        newGenreHistoryScoresIndex = (oldGenreHistoryScoresListIndex+1)%20;

    }
    let sum = 0;
    newGenreHistoryScores.forEach(item => {sum += item;});
    const newGenreHistoryScore = sum/newGenreHistoryScores.length;


    return{
        overall_score: newOverallScore,
        genre_score: newGenreScore,
        genre_level_correct: newGenreLevelCorrect,
        genre_history_score: newGenreHistoryScore,
        genre_history_scores: newGenreHistoryScores,
        genre_history_scores_index: newGenreHistoryScoresIndex

    };
}




