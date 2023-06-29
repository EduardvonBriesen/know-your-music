import { doc, getDoc,updateDoc,type DocumentData } from "firebase/firestore";

/* export const getDocRef = async(docName: string, db: any) =>{
    const collectionsName = "users";
    const docRef = doc(db, collectionsName, docName);
    return docRef;
} */

/* export const getSessionsBegin = async (docName: string, db: any )=> {
    const collectionsName = "users";
    const docRef = doc(db, collectionsName, docName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const history = docSnap.data().logs.history;
        // console.log(history[0].sessions[0].begin);
        // console.log(history.length);
        const historyLength = history.length;
        const sessions = history[historyLength-1].sessions
        // console.log(sessions.length);
        console.log(sessions[sessions.length-1].begin);
        return sessions[sessions.length-1].begin;
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
} */

/* export const setSessionsDuration = async(docName: string, db: any) => {
    const begin = await getSessionsBegin(docName,db);
    const date = new Date();
	const duration = date.getMinutes()+date.getHours()*60 - begin;
    console.log(duration);
    const collectionsName = "users";
    const docRef = doc(db, collectionsName, docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) { 
        const history = docSnap.data().logs.history;

        const sessions =history[history.length-1].sessions;
        sessions[sessions.length-1].duration = duration;
        history[history.length-1].sessions = sessions;
        await updateDoc(docRef, {
            "logs.history": history
        });
    } 
}*/

export const saveHistory = async (docName: string, db: any)=>{
    const collectionsName = "users";
    const docRef = doc(db, collectionsName, docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        const history = docSnap.data().logs.history;
        const historyLength = history.length;
        const sessions = history[historyLength-1].sessions
        const begin= sessions[sessions.length-1].begin;
        const date = new Date();
	    //const duration = date.getMinutes()+date.getHours()*60 - begin;
        // console.log("Aktuelle Zeit   "+ Math.round(date.valueOf()/1000 ));
        // console.log("Anfangszeit  "+ begin.seconds);
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
        const sessions = history[history.length-1].sessions;
        //sessions.push(newSessionsArrayElement(dateObject));
        history[history.length-1].sessions.push(newSessionsArrayElement(dateObject));
    }
    await updateDoc(docRef, {
        "logs.history": history
    });
}

export const newHistoryArrayElement = (date: Date )=> {
    const newHistory = {
        date: date.toLocaleDateString(),
        accumulated_duration: 0,
        sessions: [
            {
                //begin: (date.getMinutes()+date.getHours()*60),
                begin: date,
                duration: 0
            }
        ]
     }
     return newHistory;
}

export const newSessionsArrayElement = (date: Date )=> {
    const newSession = {
        //begin: (date.getMinutes()+date.getHours()*60),
        begin: date,
        duration:0
     }
     return newSession;
}

export const initDataStructure = (name: string, email: any )=> {
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
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                rock: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                jazz: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                folk_music: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                rap: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                classic: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                }

            },
            music_periods:{
                outdated: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                eighties: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                nineties: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                twothousandties: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },
                charts: {
                    levelOne: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelTwo: {
                        correct_one: 0,
                        questions: 0
                    },
                    levelThree: {
                        correct_one: 0,
                        questions: 0
                    },
                    overall_questions: 0
                },

            }

        },
        logs:{
            registered_since: (new Date()).toLocaleDateString(),
            overall_duration: 0,
            history: [
                {
                    date: (new Date()).toLocaleDateString(),
                    accumulated_duration: 0,
                    sessions: [
                        {
                            //begin: ((new Date()).getMinutes()+(new Date()).getHours()*60),
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