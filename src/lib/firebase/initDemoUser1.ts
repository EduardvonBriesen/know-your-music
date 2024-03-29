import type { UserData } from './dataBase.types';

const MAX_HISTORY_LENGTH = 20;

export type HistoryElement = {
		date: string,
		accumulated_duration: number;
		sessions: SessionElement[];
		last_score: number;
}

export type SessionElement = {
	begin: Date;
	duration: number;
	final_score: number;
	final_history_score: number;
}


function generateRandomHistory(dates: Date[]):HistoryElement[]{
	const history: HistoryElement[] = [];
	let date: Date = dates[0];
	for (let itr=0; itr<dates.length;itr++){
		date = dates[itr];
		const {sessions, accumulatedDuration} = generateRandomSession(date);
		const newHistory: HistoryElement = {
			date: date.toLocaleDateString(),
			accumulated_duration: accumulatedDuration,
			sessions: sessions,
			last_score: 0
		}
		history.push(newHistory)
		//date = dates[it];
	}
	return history;
}

function caluculateOverallDuration(history: HistoryElement[]):number{
	let result = 0;
	for(const hist of history){
		result = result + hist.accumulated_duration;
	}
	return result;
}

function generateRandomSession(date:Date): 
{
	sessions: SessionElement[], 
	accumulatedDuration: number
}
{
	const sessions: SessionElement[] = [];
	const sessionCount = 1+Math.floor(Math.random()*10)

	let overall_duration = 0;
	let duration = 0;
	let score= 0;
	let historyScore= 0;
	let begin: Date = new Date();

	for (let itr=0; itr<sessionCount; itr++){
		if (itr===0){
			begin = date; // first login this day
		}else{
			begin = getNextDate(begin, duration); // after the first login on this day
		}

		duration = Math.round(Math.random()*500);
		overall_duration = overall_duration + duration;
		score = parseFloat((0.95*Math.random()).toFixed(3)+0.05)
		historyScore = parseFloat((0.8*Math.random()).toFixed(3)+0.2)

		const newSession: SessionElement = {
			begin: begin,
			duration: duration,
			final_score: score,
			final_history_score: historyScore
		}
		sessions.push(newSession)
	}
	return {
		sessions: sessions,
		accumulatedDuration:overall_duration
	}
}

function getNextDate(old: Date, duration: number){
	old.setSeconds(duration+ (20*60 + 4000*Math.random()))
	const newDate:Date = new Date(old.toString());
	return newDate;
}

function getRandomTime(startHour:number, endHour:number) {
	const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
	const minutes = Math.floor(Math.random() * 60);
	return `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

export const initDataStructure = (name: string, email: string) => {
	const dates: Date[] = [
		new Date("2023-05-16T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-17T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-18T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-19T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-20T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-21T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-22T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-24T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-25T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-26T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-27T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-28T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-29T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-05-30T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-01T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-02T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-03T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-04T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-05T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-06T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-08T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-09T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-10T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-11T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-13T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-14T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-15T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-16T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-17T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-18T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-19T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-21T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-22T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-23T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-24T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-25T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-27T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-06-30T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-01T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-02T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-04T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-05T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-07T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-08T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-10T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-12T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-13T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-14T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-15T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-16T" + getRandomTime(8, 12) + ":00.000Z"),
		new Date("2023-07-17T" + getRandomTime(8, 12) + ":00.000Z"),
	  ];
	const history: HistoryElement[] = generateRandomHistory(dates);

	const data: UserData = {
		name: name,
		email: email,
		progress: {
			overall_score: 0.449,
			shortterm_overall_history: {
				// this in independent of item/genre
				MAX_HISTORY_LENGTH: MAX_HISTORY_LENGTH, // proposal =20
				current_index: -1, // index of the oldest element, if overall_questions<20 then index=-1
				list_of_scores: [
					0.8, 0.8, 1, 0, 0.5, 0.5, 0.3, 1, 1, 1, 0.8, 1, 0.5, 1, 0.8, 0.3, 0, 1, 0.8, 1
				],
				score: 0.7
			},
			overall_questions: 390,
			genre_scores: {
				classic: 0.75,
				rock: 0.533,
				pop: 0.383,
				jazz: 0.233,
				rap: 0.127,
				folk_music: 0.667
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
						correct: 0.7,
						questions: 45
					},
					level2: {
						correct: 0.3,
						questions: 20
					},
					level3: {
						correct: 0.15,
						questions: 5
					},
					history_score: 0.67,
					history: {
						scores: [0.5, 0.8, 1, 1, 0, 0.5, 0.3, 0.8, 1, 0.8],
						index_oldest_score: 0
					},
					overall_questions: 70
				},
				rock: {
					level1: {
						correct: 0.8,
						questions: 30
					},
					level2: {
						correct: 0.5,
						questions: 23
					},
					level3: {
						correct: 0.3,
						questions: 11
					},
					history_score: 0.67,
					history: {
						scores: [1, 0.5, 0, 1, 0.8, 0.3, 0.5, 0.8, 0.8, 1],
						index_oldest_score: 4
					},
					overall_questions: 64
				},
				jazz: {
					level1: {
						correct: 0.4,
						questions: 60
					},
					level2: {
						correct: 0.2,
						questions: 15
					},
					level3: {
						correct: 0.1,
						questions: 5
					},
					history_score: 0.32,
					history: {
						scores: [0.3, 0, 0.5, 0.8, 0, 1, 0.3, 0, 0, 0.3],
						index_oldest_score: 0
					},
					overall_questions: 80
				},
				folk_music: {
					level1: {
						correct: 0.9,
						questions: 10
					},
					level2: {
						correct: 0.7,
						questions: 20
					},
					level3: {
						correct: 0.4,
						questions: 17
					},
					history_score: 0.77,
					history: {
						scores: [1, 0.8, 0.5, 0.8, 0.8, 1, 1, 0.3, 0.5, 1],
						index_oldest_score: 7
					},
					overall_questions: 47
				},
				rap: {
					level1: {
						correct: 0.27,
						questions: 57
					},
					level2: {
						correct: 0.11,
						questions: 17
					},
					level3: {
						correct: 0.0,
						questions: 3
					},
					history_score: 0.34,
					history: {
						scores: [0, 0.3, 0.5, 0, 0, 0.8, 1, 0.3, 0, 0.5],
						index_oldest_score: 7
					},
					overall_questions: 77
				},
				classic: {
					level1: {
						correct: 0.95,
						questions: 10
					},
					level2: {
						correct: 0.8,
						questions: 12
					},
					level3: {
						correct: 0.5,
						questions: 30
					},
					history_score: 0.67,
					history: {
						scores: [1, 0.5, 0, 0.8, 1, 1, 0.3, 0.8, 1, 0.3],
						index_oldest_score: 2
					},
					overall_questions: 52
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
			itemtypes: {
				Biography: {
					overallQuestions: 70,
					overallScore: 0.56,
					historyScore: 0.5,
					historyScores: [0.8, 0.5, 1, 0, 1, 0.3, 0.3, 0.8, 0, 0.3],
					index: 0
				},
				Discography: {
					overallQuestions: 88,
					overallScore: 0.33,
					historyScore: 0.6,
					historyScores: [1, 0.3, 0, 1, 1, 0.8, 0.3, 0.8, 0, 0.8],
					index: 8
				},
				Popularity: {
					overallQuestions: 65,
					overallScore: 0.67,
					historyScore: 0.64,
					historyScores: [0.5, 0.3, 0, 1, 1, 0.3, 1, 0.8, 0.5, 1],
					index: 5
				},
				Lyrics: {
					overallQuestions: 77,
					overallScore: 0.2,
					historyScore: 0.55,
					historyScores: [0.3, 1, 0, 0.8, 0.8, 0, 0.5, 0.8, 1, 0.3],
					index: 7
				},
				Coverguess: {
					overallQuestions: 90,
					overallScore: 0.485,
					historyScore: 0.55,
					historyScores: [1, 1, 0.3, 0.5, 0.3, 0.8, 0, 0.3, 0.8, 0.5],
					index: 0
				},
				Song: {
					overallQuestions: 90,
					overallScore: 0.485,
					historyScore: 0.55,
					historyScores: [1, 1, 0.3, 0.5, 0.3, 0.8, 0, 0.3, 0.8, 0.5],
					index: 0
				}
			},
			shortterm_itemtype_history: {
				MAX_HISTORY_LENGTH: MAX_HISTORY_LENGTH,
				current_index: 10,
				list_of_items: [
					'Biography',
					'Coverguess',
					'Lyrics',
					'Lyrics',
					'Popularity',
					'Coverguess',
					'Discography',
					'Discography',
					'Lyrics',
					'Biography',
					'Popularity',
					'Biography',
					'Lyrics',
					'Popularity',
					'Coverguess',
					'Discography',
					'Coverguess',
					'Song',
					'Discography',
					'Lyrics',
					'Popularity'
				]
			},
			shortterm_genre_history: {
				MAX_HISTORY_LENGTH: MAX_HISTORY_LENGTH, // proposal =20
				current_index: 10, // index of the oldest element, if overall_questions<20 then index=-1
				list_of_genre: [
					'pop',
					'rock',
					'rap',
					'folk_music',
					'jazz',
					'rap',
					'jazz',
					'classic',
					'rap',
					'pop',
					'rap',
					'jazz',
					'folk_music',
					'pop',
					'rap',
					'rap',
					'jazz',
					'classic',
					'rap',
					'rock'
				]
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
							duration: 0,
							final_score: 0,
							final_history_score: 0
						}
					],
					last_score: 0
				}
			]
		}
	};
	return data;
};
