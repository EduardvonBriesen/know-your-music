
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
                    date: "",
                    accumulated_duration: 0,
                    sessions: [
                        {
                            begin: 0,
                            end: 0
                        }
                    ]
                }
            ]
        }
    }
    return data;
}