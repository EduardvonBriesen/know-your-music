import type { UserData } from './dataBase.types';

const MAX_HISTORY_LENGTH = 20;

export function initDataStructure2():UserData{
    return {
        "name": "Max Mustermann",
        "email": "DEMO@DEMO2.de",
        "progress": {
          "overall_score": 0.449,
          "shortterm_overall_history": {
            "MAX_HISTORY_LENGTH": 20,
            "current_index": -1,
            "list_of_scores": [
              0.8,
              0.8,
              1,
              0,
              0.5,
              0.5,
              0.3,
              1,
              1,
              1,
              0.8,
              1,
              0.5,
              1,
              0.8,
              0.3,
              0,
              1,
              0.8,
              1
            ],
            "score": 0.7
          },
          "overall_questions": 390,
          "genre_scores": {
            "classic": 0.75,
            "rock": 0.533,
            "pop": 0.383,
            "jazz": 0.233,
            "rap": 0.127,
            "folk_music": 0.667
          },
          "music_period_scores": {
            "outdated": 0,
            "80s": 0,
            "90s": 0,
            "00s": 0,
            "2020s": 0
          },
          "genres": {
            "pop": {
              "level1": {
                "correct": 0.7,
                "questions": 45
              },
              "level2": {
                "correct": 0.3,
                "questions": 20
              },
              "level3": {
                "correct": 0.15,
                "questions": 5
              },
              "history_score": 0.67,
              "history": {
                "scores": [
                  0.5,
                  0.8,
                  1,
                  1,
                  0,
                  0.5,
                  0.3,
                  0.8,
                  1,
                  0.8
                ],
                "index_oldest_score": 0
              },
              "overall_questions": 70
            },
            "rock": {
              "level1": {
                "correct": 0.8,
                "questions": 30
              },
              "level2": {
                "correct": 0.5,
                "questions": 23
              },
              "level3": {
                "correct": 0.3,
                "questions": 11
              },
              "history_score": 0.67,
              "history": {
                "scores": [
                  1,
                  0.5,
                  0,
                  1,
                  0.8,
                  0.3,
                  0.5,
                  0.8,
                  0.8,
                  1
                ],
                "index_oldest_score": 4
              },
              "overall_questions": 64
            },
            "jazz": {
              "level1": {
                "correct": 0.4,
                "questions": 60
              },
              "level2": {
                "correct": 0.2,
                "questions": 15
              },
              "level3": {
                "correct": 0.1,
                "questions": 5
              },
              "history_score": 0.32,
              "history": {
                "scores": [
                  0.3,
                  0,
                  0.5,
                  0.8,
                  0,
                  1,
                  0.3,
                  0,
                  0,
                  0.3
                ],
                "index_oldest_score": 0
              },
              "overall_questions": 80
            },
            "folk_music": {
              "level1": {
                "correct": 0.9,
                "questions": 10
              },
              "level2": {
                "correct": 0.7,
                "questions": 20
              },
              "level3": {
                "correct": 0.4,
                "questions": 17
              },
              "history_score": 0.77,
              "history": {
                "scores": [
                  1,
                  0.8,
                  0.5,
                  0.8,
                  0.8,
                  1,
                  1,
                  0.3,
                  0.5,
                  1
                ],
                "index_oldest_score": 7
              },
              "overall_questions": 47
            },
            "rap": {
              "level1": {
                "correct": 0.27,
                "questions": 57
              },
              "level2": {
                "correct": 0.11,
                "questions": 17
              },
              "level3": {
                "correct": 0,
                "questions": 3
              },
              "history_score": 0.34,
              "history": {
                "scores": [
                  0,
                  0.3,
                  0.5,
                  0,
                  0,
                  0.8,
                  1,
                  0.3,
                  0,
                  0.5
                ],
                "index_oldest_score": 7
              },
              "overall_questions": 77
            },
            "classic": {
              "level1": {
                "correct": 0.95,
                "questions": 10
              },
              "level2": {
                "correct": 0.8,
                "questions": 12
              },
              "level3": {
                "correct": 0.5,
                "questions": 30
              },
              "history_score": 0.67,
              "history": {
                "scores": [
                  1,
                  0.5,
                  0,
                  0.8,
                  1,
                  1,
                  0.3,
                  0.8,
                  1,
                  0.3
                ],
                "index_oldest_score": 2
              },
              "overall_questions": 52
            }
          },
          "music_periods": {
            "outdated": {
              "level1": {
                "correct": 0,
                "questions": 0
              },
              "level2": {
                "correct": 0,
                "questions": 0
              },
              "level3": {
                "correct": 0,
                "questions": 0
              },
              "history_score": 0,
              "history": {
                "scores": [],
                "index_oldest_score": -1
              },
              "overall_questions": 0
            },
            "80s": {
              "level1": {
                "correct": 0,
                "questions": 0
              },
              "level2": {
                "correct": 0,
                "questions": 0
              },
              "level3": {
                "correct": 0,
                "questions": 0
              },
              "history_score": 0,
              "history": {
                "scores": [],
                "index_oldest_score": -1
              },
              "overall_questions": 0
            },
            "90s": {
              "level1": {
                "correct": 0,
                "questions": 0
              },
              "level2": {
                "correct": 0,
                "questions": 0
              },
              "level3": {
                "correct": 0,
                "questions": 0
              },
              "history_score": 0,
              "history": {
                "scores": [],
                "index_oldest_score": -1
              },
              "overall_questions": 0
            },
            "00s": {
              "level1": {
                "correct": 0,
                "questions": 0
              },
              "level2": {
                "correct": 0,
                "questions": 0
              },
              "level3": {
                "correct": 0,
                "questions": 0
              },
              "history_score": 0,
              "history": {
                "scores": [],
                "index_oldest_score": -1
              },
              "overall_questions": 0
            },
            "2020s": {
              "level1": {
                "correct": 0,
                "questions": 0
              },
              "level2": {
                "correct": 0,
                "questions": 0
              },
              "level3": {
                "correct": 0,
                "questions": 0
              },
              "history_score": 0,
              "history": {
                "scores": [],
                "index_oldest_score": -1
              },
              "overall_questions": 0
            }
          },
          "itemtypes": {
            "Biography": {
              "overallQuestions": 70,
              "overallScore": 0.56,
              "historyScore": 0.5,
              "historyScores": [
                0.8,
                0.5,
                1,
                0,
                1,
                0.3,
                0.3,
                0.8,
                0,
                0.3
              ],
              "index": 0
            },
            "Discography": {
              "overallQuestions": 88,
              "overallScore": 0.33,
              "historyScore": 0.6,
              "historyScores": [
                1,
                0.3,
                0,
                1,
                1,
                0.8,
                0.3,
                0.8,
                0,
                0.8
              ],
              "index": 8
            },
            "Popularity": {
              "overallQuestions": 65,
              "overallScore": 0.67,
              "historyScore": 0.64,
              "historyScores": [
                0.5,
                0.3,
                0,
                1,
                1,
                0.3,
                1,
                0.8,
                0.5,
                1
              ],
              "index": 5
            },
            "Lyrics": {
              "overallQuestions": 77,
              "overallScore": 0.2,
              "historyScore": 0.55,
              "historyScores": [
                0.3,
                1,
                0,
                0.8,
                0.8,
                0,
                0.5,
                0.8,
                1,
                0.3
              ],
              "index": 7
            },
            "Coverguess": {
              "overallQuestions": 90,
              "overallScore": 0.485,
              "historyScore": 0.55,
              "historyScores": [
                1,
                1,
                0.3,
                0.5,
                0.3,
                0.8,
                0,
                0.3,
                0.8,
                0.5
              ],
              "index": 0
            }
          },
          "shortterm_itemtype_history": {
            "MAX_HISTORY_LENGTH": 20,
            "current_index": 10,
            "list_of_items": [
              "Biography",
              "Coverguess",
              "Lyrics",
              "Lyrics",
              "Popularity",
              "Coverguess",
              "Discography",
              "Discography",
              "Lyrics",
              "Biography",
              "Popularity",
              "Biography",
              "Lyrics",
              "Popularity",
              "Coverguess",
              "Discography",
              "Coverguess",
              "Discography",
              "Lyrics",
              "Popularity"
            ]
          },
          "shortterm_genre_history": {
            "MAX_HISTORY_LENGTH": 20,
            "current_index": 10,
            "list_of_genre": [
              "pop",
              "rock",
              "rap",
              "folk_music",
              "jazz",
              "rap",
              "jazz",
              "classic",
              "rap",
              "pop",
              "rap",
              "jazz",
              "folk_music",
              "pop",
              "rap",
              "rap",
              "jazz",
              "classic",
              "rap",
              "rock"
            ]
          }
        },
        "logs": {
          "registered_since": new Date("2023-05-01T12:33:05.000Z"),
          "overall_duration": 91317,
          "history": [
            {
              "date": "5/1/2023",
              "accumulated_duration": 3193,
              "sessions": [
                {
                  "begin":  new Date("2023-05-01T12:33:05.000Z"),
                  "duration": 240,
                  "final_score": 0.016,
                  "final_history_score": 0.394
                },
                {
                  "begin": new Date("2023-05-01T14:04:01.000Z"),
                  "duration": 449,
                  "final_score": 0.009,
                  "final_history_score": 0.667
                },
                {
                  "begin": new Date("2023-05-01T14:45:39.000Z"),
                  "duration": 375,
                  "final_score": 0.011,
                  "final_history_score": 0.299
                },
                {
                  "begin": new Date("2023-05-01T15:35:08.000Z"),
                  "duration": 241,
                  "final_score": 0,
                  "final_history_score": 0.005
                },
                {
                  "begin": new Date("2023-05-01T16:33:05.000Z"),
                  "duration": 258,
                  "final_score": 0.017,
                  "final_history_score": 0.013
                },
                {
                  "begin": new Date("2023-05-01T18:03:34.000Z"),
                  "duration": 261,
                  "final_score": 0.012,
                  "final_history_score": 0.722
                },
                {
                  "begin": new Date("2023-05-01T19:22:36.000Z"),
                  "duration": 472,
                  "final_score": 0.011,
                  "final_history_score": 0.505
                },
                {
                  "begin": new Date("2023-05-01T20:27:34.000Z"),
                  "duration": 413,
                  "final_score": 0.011,
                  "final_history_score": 0.774
                },
                {
                  "begin": new Date("2023-05-01T20:27:34.000Z"),
                  "duration": 484,
                  "final_score": 0.014,
                  "final_history_score": 0.012
                }
              ],
              "last_score": 0.014
            },
            {
              "date": "5/2/2023",
              "accumulated_duration": 2206,
              "sessions": [
                {
                  "begin": new Date("2023-05-02T09:16:23.000Z"),
                  "duration": 419,
                  "final_score": 0.026,
                  "final_history_score": 0.589
                },
                {
                  "begin": new Date("2023-05-02T09:44:19.000Z"),
                  "duration": 229,
                  "final_score": 0.02,
                  "final_history_score": 0.182
                },
                {
                  "begin": new Date("2023-05-02T10:58:38.000Z"),
                  "duration": 349,
                  "final_score": 0.023,
                  "final_history_score": 0.168
                },
                {
                  "begin": new Date("2023-05-02T11:56:41.000Z"),
                  "duration": 117,
                  "final_score": 0.028,
                  "final_history_score": 0.764
                },
                {
                  "begin": new Date("2023-05-02T12:49:50.000Z"),
                  "duration": 212,
                  "final_score": 0.017,
                  "final_history_score": 0.479
                },
                {
                  "begin": new Date("2023-05-02T13:34:15.000Z"),
                  "duration": 26,
                  "final_score": 0.018,
                  "final_history_score": 0.425
                },
                {
                  "begin": new Date("2023-05-02T14:11:24.000Z"),
                  "duration": 396,
                  "final_score": 0.028,
                  "final_history_score": 0.369
                },
                {
                  "begin": new Date("2023-05-02T15:09:56.000Z"),
                  "duration": 300,
                  "final_score": 0.031,
                  "final_history_score": 0.411
                },
                {
                  "begin": new Date("2023-05-02T15:09:56.000Z"),
                  "duration": 158,
                  "final_score": 0.032,
                  "final_history_score": 0.751
                }
              ],
              "last_score": 0.032
            },
            {
              "date": "5/3/2023",
              "accumulated_duration": 2065,
              "sessions": [
                {
                  "begin": new Date("2023-05-03T11:30:22.000Z"),
                  "duration": 262,
                  "final_score": 0.04,
                  "final_history_score": 0.706
                },
                {
                  "begin": new Date("2023-05-03T12:23:37.000Z"),
                  "duration": 295,
                  "final_score": 0.049,
                  "final_history_score": 0.728
                },
                {
                  "begin": new Date("2023-05-03T12:58:35.000Z"),
                  "duration": 225,
                  "final_score": 0.037,
                  "final_history_score": 0.792
                },
                {
                  "begin": new Date("2023-05-03T13:34:38.000Z"),
                  "duration": 387,
                  "final_score": 0.036,
                  "final_history_score": 0.284
                },
                {
                  "begin": new Date("2023-05-03T13:58:45.000Z"),
                  "duration": 257,
                  "final_score": 0.049,
                  "final_history_score": 0.056
                },
                {
                  "begin": new Date("2023-05-03T14:32:58.000Z"),
                  "duration": 318,
                  "final_score": 0.038,
                  "final_history_score": 0.199
                },
                {
                  "begin": new Date("2023-05-03T14:32:58.000Z"),
                  "duration": 321,
                  "final_score": 0.034,
                  "final_history_score": 0.737
                }
              ],
              "last_score": 0.034
            },
            {
              "date": "5/4/2023",
              "accumulated_duration": 2144,
              "sessions": [
                {
                  "begin": new Date("2023-05-04T10:47:10.000Z"),
                  "duration": 3,
                  "final_score": 0.035,
                  "final_history_score": 0.374
                },
                {
                  "begin": new Date("2023-05-04T11:17:55.000Z"),
                  "duration": 221,
                  "final_score": 0.046,
                  "final_history_score": 0.197
                },
                {
                  "begin": new Date("2023-05-04T12:02:52.000Z"),
                  "duration": 438,
                  "final_score": 0.048,
                  "final_history_score": 0.411
                },
                {
                  "begin": new Date("2023-05-04T12:57:52.000Z"),
                  "duration": 431,
                  "final_score": 0.052,
                  "final_history_score": 0.402
                },
                {
                  "begin": new Date("2023-05-04T14:21:31.000Z"),
                  "duration": 144,
                  "final_score": 0.043,
                  "final_history_score": 0.544
                },
                {
                  "begin": new Date("2023-05-04T15:24:23.000Z"),
                  "duration": 495,
                  "final_score": 0.05,
                  "final_history_score": 0.346
                },
                {
                  "begin": new Date("2023-05-04T16:44:08.000Z"),
                  "duration": 15,
                  "final_score": 0.045,
                  "final_history_score": 0.701
                },
                {
                  "begin": new Date("2023-05-04T16:44:08.000Z"),
                  "duration": 397,
                  "final_score": 0.051,
                  "final_history_score": 0.772
                }
              ],
              "last_score": 0.051
            },
            {
              "date": "5/5/2023",
              "accumulated_duration": 2071,
              "sessions": [
                {
                  "begin": new Date("2023-05-05T10:38:11.000Z"),
                  "duration": 411,
                  "final_score": 0.059,
                  "final_history_score": 0.511
                },
                {
                  "begin": new Date("2023-05-05T11:49:38.000Z"),
                  "duration": 318,
                  "final_score": 0.061,
                  "final_history_score": 0.049
                },
                {
                  "begin": new Date("2023-05-05T12:45:55.000Z"),
                  "duration": 243,
                  "final_score": 0.052,
                  "final_history_score": 0.732
                },
                {
                  "begin": new Date("2023-05-05T13:27:11.000Z"),
                  "duration": 143,
                  "final_score": 0.059,
                  "final_history_score": 0.088
                },
                {
                  "begin": new Date("2023-05-05T14:04:42.000Z"),
                  "duration": 80,
                  "final_score": 0.067,
                  "final_history_score": 0.519
                },
                {
                  "begin": new Date("2023-05-05T14:43:08.000Z"),
                  "duration": 418,
                  "final_score": 0.051,
                  "final_history_score": 0.733
                },
                {
                  "begin": new Date("2023-05-05T14:43:08.000Z"),
                  "duration": 458,
                  "final_score": 0.064,
                  "final_history_score": 0.144
                }
              ],
              "last_score": 0.064
            },
            {
              "date": "5/6/2023",
              "accumulated_duration": 2564,
              "sessions": [
                {
                  "begin": new Date("2023-05-06T11:31:03.000Z"),
                  "duration": 365,
                  "final_score": 0.08,
                  "final_history_score": 0.78
                },
                {
                  "begin": new Date("2023-05-06T12:37:14.000Z"),
                  "duration": 146,
                  "final_score": 0.083,
                  "final_history_score": 0.371
                },
                {
                  "begin": new Date("2023-05-06T13:25:58.000Z"),
                  "duration": 337,
                  "final_score": 0.08,
                  "final_history_score": 0.464
                },
                {
                  "begin": new Date("2023-05-06T13:54:35.000Z"),
                  "duration": 300,
                  "final_score": 0.078,
                  "final_history_score": 0.617
                },
                {
                  "begin": new Date("2023-05-06T14:50:35.000Z"),
                  "duration": 442,
                  "final_score": 0.074,
                  "final_history_score": 0.454
                },
                {
                  "begin": new Date("2023-05-06T15:40:55.000Z"),
                  "duration": 477,
                  "final_score": 0.071,
                  "final_history_score": 0.511
                },
                {
                  "begin": new Date("2023-05-06T17:04:08.000Z"),
                  "duration": 71,
                  "final_score": 0.079,
                  "final_history_score": 0.285
                },
                {
                  "begin": new Date("2023-05-06T17:33:35.000Z"),
                  "duration": 387,
                  "final_score": 0.08,
                  "final_history_score": 0.71
                },
                {
                  "begin": new Date("2023-05-06T17:33:35.000Z"),
                  "duration": 39,
                  "final_score": 0.07,
                  "final_history_score": 0.362
                }
              ],
              "last_score": 0.07
            },
            {
              "date": "5/8/2023",
              "accumulated_duration": 2590,
              "sessions": [
                {
                  "begin": new Date("2023-05-08T14:03:15.000Z"),
                  "duration": 421,
                  "final_score": 0.074,
                  "final_history_score": 0.291
                },
                {
                  "begin": new Date("2023-05-08T15:21:04.000Z"),
                  "duration": 371,
                  "final_score": 0.085,
                  "final_history_score": 0.792
                },
                {
                  "begin": new Date("2023-05-08T16:48:10.000Z"),
                  "duration": 364,
                  "final_score": 0.087,
                  "final_history_score": 0.785
                },
                {
                  "begin": new Date("2023-05-08T17:38:21.000Z"),
                  "duration": 88,
                  "final_score": 0.076,
                  "final_history_score": 0.64
                },
                {
                  "begin": new Date("2023-05-08T18:18:00.000Z"),
                  "duration": 496,
                  "final_score": 0.075,
                  "final_history_score": 0.404
                },
                {
                  "begin": new Date("2023-05-08T18:53:05.000Z"),
                  "duration": 442,
                  "final_score": 0.073,
                  "final_history_score": 0.156
                },
                {
                  "begin": new Date("2023-05-08T20:11:36.000Z"),
                  "duration": 216,
                  "final_score": 0.084,
                  "final_history_score": 0.38
                },
                {
                  "begin": new Date("2023-05-08T20:11:36.000Z"),
                  "duration": 192,
                  "final_score": 0.07,
                  "final_history_score": 0.059
                }
              ],
              "last_score": 0.07
            },
            {
              "date": "5/9/2023",
              "accumulated_duration": 1578,
              "sessions": [
                {
                  "begin": new Date("2023-05-09T12:40:18.000Z"),
                  "duration": 247,
                  "final_score": 0.085,
                  "final_history_score": 0.554
                },
                {
                  "begin": new Date("2023-05-09T13:40:36.000Z"),
                  "duration": 299,
                  "final_score": 0.088,
                  "final_history_score": 0.375
                },
                {
                  "begin": new Date("2023-05-09T14:11:48.000Z"),
                  "duration": 453,
                  "final_score": 0.074,
                  "final_history_score": 0.131
                },
                {
                  "begin": new Date("2023-05-09T14:59:50.000Z"),
                  "duration": 126,
                  "final_score": 0.089,
                  "final_history_score": 0.082
                },
                {
                  "begin": new Date("2023-05-09T14:59:50.000Z"),
                  "duration": 453,
                  "final_score": 0.077,
                  "final_history_score": 0.684
                }
              ],
              "last_score": 0.077
            },
            {
              "date": "5/10/2023",
              "accumulated_duration": 463,
              "sessions": [
                {
                  "begin": new Date("2023-05-10T08:22:00.000Z"),
                  "duration": 463,
                  "final_score": 0.079,
                  "final_history_score": 0.792
                }
              ],
              "last_score": 0.079
            },
            {
              "date": "5/11/2023",
              "accumulated_duration": 751,
              "sessions": [
                {
                  "begin": new Date("2023-05-11T11:16:18.000Z"),
                  "duration": 2,
                  "final_score": 0.092,
                  "final_history_score": 0.011
                },
                {
                  "begin": new Date("2023-05-11T12:33:17.000Z"),
                  "duration": 65,
                  "final_score": 0.083,
                  "final_history_score": 0.431
                },
                {
                  "begin": new Date("2023-05-11T13:40:00.000Z"),
                  "duration": 379,
                  "final_score": 0.097,
                  "final_history_score": 0.434
                },
                {
                  "begin": new Date("2023-05-11T14:13:09.000Z"),
                  "duration": 46,
                  "final_score": 0.079,
                  "final_history_score": 0.614
                },
                {
                  "begin": new Date("2023-05-11T14:13:09.000Z"),
                  "duration": 259,
                  "final_score": 0.097,
                  "final_history_score": 0.264
                }
              ],
              "last_score": 0.097
            },
            {
              "date": "5/13/2023",
              "accumulated_duration": 462,
              "sessions": [
                {
                  "begin": new Date("2023-05-13T11:03:00.000Z"),
                  "duration": 462,
                  "final_score": 0.11,
                  "final_history_score": 0.461
                }
              ],
              "last_score": 0.11
            },
            {
              "date": "5/14/2023",
              "accumulated_duration": 696,
              "sessions": [
                {
                  "begin": new Date("2023-05-14T13:57:55.000Z"),
                  "duration": 13,
                  "final_score": 0.124,
                  "final_history_score": 0.675
                },
                {
                  "begin": new Date("2023-05-14T14:35:14.000Z"),
                  "duration": 443,
                  "final_score": 0.112,
                  "final_history_score": 0.23
                },
                {
                  "begin": new Date("2023-05-14T15:21:24.000Z"),
                  "duration": 204,
                  "final_score": 0.114,
                  "final_history_score": 0.639
                },
                {
                  "begin": new Date("2023-05-14T15:21:24.000Z"),
                  "duration": 36,
                  "final_score": 0.121,
                  "final_history_score": 0.58
                }
              ],
              "last_score": 0.121
            },
            {
              "date": "5/15/2023",
              "accumulated_duration": 630,
              "sessions": [
                {
                  "begin": new Date("2023-05-15T10:46:47.000Z"),
                  "duration": 255,
                  "final_score": 0.139,
                  "final_history_score": 0.408
                },
                {
                  "begin": new Date("2023-05-15T11:44:03.000Z"),
                  "duration": 157,
                  "final_score": 0.128,
                  "final_history_score": 0.182
                },
                {
                  "begin": new Date("2023-05-15T12:55:43.000Z"),
                  "duration": 30,
                  "final_score": 0.122,
                  "final_history_score": 0.678
                },
                {
                  "begin": new Date("2023-05-15T12:55:43.000Z"),
                  "duration": 188,
                  "final_score": 0.136,
                  "final_history_score": 0.091
                }
              ],
              "last_score": 0.136
            },
            {
              "date": "5/16/2023",
              "accumulated_duration": 420,
              "sessions": [
                {
                  "begin": new Date("2023-05-16T12:34:52.000Z"),
                  "duration": 145,
                  "final_score": 0.149,
                  "final_history_score": 0.718
                },
                {
                  "begin": new Date("2023-05-16T13:04:28.000Z"),
                  "duration": 162,
                  "final_score": 0.138,
                  "final_history_score": 0.765
                },
                {
                  "begin": new Date("2023-05-16T13:04:28.000Z"),
                  "duration": 113,
                  "final_score": 0.14,
                  "final_history_score": 0.756
                }
              ],
              "last_score": 0.14
            },
            {
              "date": "5/17/2023",
              "accumulated_duration": 603,
              "sessions": [
                {
                  "begin": new Date("2023-05-17T09:44:31.000Z"),
                  "duration": 110,
                  "final_score": 0.15,
                  "final_history_score": 0.193
                },
                {
                  "begin": new Date("2023-05-17T09:44:31.000Z"),
                  "duration": 493,
                  "final_score": 0.145,
                  "final_history_score": 0.483
                }
              ],
              "last_score": 0.145
            },
            {
              "date": "5/18/2023",
              "accumulated_duration": 1561,
              "sessions": [
                {
                  "begin": new Date("2023-05-18T12:46:00.000Z"),
                  "duration": 459,
                  "final_score": 0.15,
                  "final_history_score": 0.691
                },
                {
                  "begin": new Date("2023-05-18T13:18:53.000Z"),
                  "duration": 299,
                  "final_score": 0.155,
                  "final_history_score": 0.17
                },
                {
                  "begin": new Date("2023-05-18T14:40:20.000Z"),
                  "duration": 406,
                  "final_score": 0.152,
                  "final_history_score": 0.606
                },
                {
                  "begin": new Date("2023-05-18T15:07:20.000Z"),
                  "duration": 27,
                  "final_score": 0.154,
                  "final_history_score": 0.706
                },
                {
                  "begin": new Date("2023-05-18T15:07:20.000Z"),
                  "duration": 370,
                  "final_score": 0.161,
                  "final_history_score": 0.286
                }
              ],
              "last_score": 0.161
            },
            {
              "date": "5/19/2023",
              "accumulated_duration": 1893,
              "sessions": [
                {
                  "begin": new Date("2023-05-19T12:39:12.000Z"),
                  "duration": 458,
                  "final_score": 0.164,
                  "final_history_score": 0.076
                },
                {
                  "begin": new Date("2023-05-19T13:05:06.000Z"),
                  "duration": 134,
                  "final_score": 0.166,
                  "final_history_score": 0.479
                },
                {
                  "begin": new Date("2023-05-19T13:28:20.000Z"),
                  "duration": 53,
                  "final_score": 0.163,
                  "final_history_score": 0.238
                },
                {
                  "begin": new Date("2023-05-19T14:29:54.000Z"),
                  "duration": 272,
                  "final_score": 0.176,
                  "final_history_score": 0.664
                },
                {
                  "begin": new Date("2023-05-19T15:14:32.000Z"),
                  "duration": 212,
                  "final_score": 0.171,
                  "final_history_score": 0.282
                },
                {
                  "begin": new Date("2023-05-19T16:01:29.000Z"),
                  "duration": 263,
                  "final_score": 0.176,
                  "final_history_score": 0.099
                },
                {
                  "begin": new Date("2023-05-19T17:05:34.000Z"),
                  "duration": 55,
                  "final_score": 0.164,
                  "final_history_score": 0.245
                },
                {
                  "begin": new Date("2023-05-19T18:00:15.000Z"),
                  "duration": 102,
                  "final_score": 0.165,
                  "final_history_score": 0.173
                },
                {
                  "begin": new Date("2023-05-19T18:00:15.000Z"),
                  "duration": 344,
                  "final_score": 0.178,
                  "final_history_score": 0.182
                }
              ],
              "last_score": 0.178
            },
            {
              "date": "5/20/2023",
              "accumulated_duration": 2945,
              "sessions": [
                {
                  "begin": new Date("2023-05-20T09:56:02.000Z"),
                  "duration": 64,
                  "final_score": 0.185,
                  "final_history_score": 0.432
                },
                {
                  "begin": new Date("2023-05-20T11:01:29.000Z"),
                  "duration": 261,
                  "final_score": 0.191,
                  "final_history_score": 0.647
                },
                {
                  "begin": new Date("2023-05-20T12:17:14.000Z"),
                  "duration": 406,
                  "final_score": 0.195,
                  "final_history_score": 0.305
                },
                {
                  "begin": new Date("2023-05-20T13:07:18.000Z"),
                  "duration": 422,
                  "final_score": 0.191,
                  "final_history_score": 0.442
                },
                {
                  "begin": new Date("2023-05-20T14:20:09.000Z"),
                  "duration": 349,
                  "final_score": 0.194,
                  "final_history_score": 0.525
                },
                {
                  "begin": new Date("2023-05-20T14:48:32.000Z"),
                  "duration": 211,
                  "final_score": 0.196,
                  "final_history_score": 0.381
                },
                {
                  "begin": new Date("2023-05-20T16:07:14.000Z"),
                  "duration": 246,
                  "final_score": 0.178,
                  "final_history_score": 0.682
                },
                {
                  "begin": new Date("2023-05-20T16:38:32.000Z"),
                  "duration": 152,
                  "final_score": 0.179,
                  "final_history_score": 0.462
                },
                {
                  "begin": new Date("2023-05-20T17:44:26.000Z"),
                  "duration": 385,
                  "final_score": 0.178,
                  "final_history_score": 0.381
                },
                {
                  "begin": new Date("2023-05-20T17:44:26.000Z"),
                  "duration": 449,
                  "final_score": 0.195,
                  "final_history_score": 0.337
                }
              ],
              "last_score": 0.195
            },
            {
              "date": "5/21/2023",
              "accumulated_duration": 1739,
              "sessions": [
                {
                  "begin": new Date("2023-05-21T10:57:56.000Z"),
                  "duration": 338,
                  "final_score": 0.215,
                  "final_history_score": 0.735
                },
                {
                  "begin": new Date("2023-05-21T11:27:27.000Z"),
                  "duration": 121,
                  "final_score": 0.198,
                  "final_history_score": 0.087
                },
                {
                  "begin": new Date("2023-05-21T12:53:25.000Z"),
                  "duration": 183,
                  "final_score": 0.207,
                  "final_history_score": 0.019
                },
                {
                  "begin": new Date("2023-05-21T13:45:16.000Z"),
                  "duration": 57,
                  "final_score": 0.204,
                  "final_history_score": 0.532
                },
                {
                  "begin": new Date("2023-05-21T15:09:42.000Z"),
                  "duration": 351,
                  "final_score": 0.201,
                  "final_history_score": 0.756
                },
                {
                  "begin": new Date("2023-05-21T16:16:52.000Z"),
                  "duration": 197,
                  "final_score": 0.206,
                  "final_history_score": 0.228
                },
                {
                  "begin": new Date("2023-05-21T17:08:25.000Z"),
                  "duration": 50,
                  "final_score": 0.203,
                  "final_history_score": 0.598
                },
                {
                  "begin": new Date("2023-05-21T17:08:25.000Z"),
                  "duration": 442,
                  "final_score": 0.197,
                  "final_history_score": 0.535
                }
              ],
              "last_score": 0.197
            },
            {
              "date": "5/22/2023",
              "accumulated_duration": 2399,
              "sessions": [
                {
                  "begin": new Date("2023-05-22T14:12:18.000Z"),
                  "duration": 129,
                  "final_score": 0.203,
                  "final_history_score": 0.118
                },
                {
                  "begin": new Date("2023-05-22T14:58:49.000Z"),
                  "duration": 298,
                  "final_score": 0.197,
                  "final_history_score": 0.213
                },
                {
                  "begin": new Date("2023-05-22T16:29:30.000Z"),
                  "duration": 419,
                  "final_score": 0.215,
                  "final_history_score": 0.177
                },
                {
                  "begin": new Date("2023-05-22T17:50:41.000Z"),
                  "duration": 65,
                  "final_score": 0.205,
                  "final_history_score": 0.576
                },
                {
                  "begin": new Date("2023-05-22T18:40:03.000Z"),
                  "duration": 450,
                  "final_score": 0.211,
                  "final_history_score": 0.486
                },
                {
                  "begin": new Date("2023-05-22T19:42:19.000Z"),
                  "duration": 93,
                  "final_score": 0.213,
                  "final_history_score": 0.181
                },
                {
                  "begin": new Date("2023-05-22T20:33:13.000Z"),
                  "duration": 277,
                  "final_score": 0.197,
                  "final_history_score": 0.728
                },
                {
                  "begin": new Date("2023-05-22T21:18:42.000Z"),
                  "duration": 34,
                  "final_score": 0.217,
                  "final_history_score": 0.585
                },
                {
                  "begin": new Date("2023-05-22T21:48:38.000Z"),
                  "duration": 469,
                  "final_score": 0.215,
                  "final_history_score": 0.522
                },
                {
                  "begin": new Date("2023-05-22T21:48:38.000Z"),
                  "duration": 165,
                  "final_score": 0.216,
                  "final_history_score": 0.441
                }
              ],
              "last_score": 0.216
            },
            {
              "date": "5/24/2023",
              "accumulated_duration": 38,
              "sessions": [
                {
                  "begin": new Date("2023-05-24T10:57:00.000Z"),
                  "duration": 38,
                  "final_score": 0.225,
                  "final_history_score": 0.186
                }
              ],
              "last_score": 0.225
            },
            {
              "date": "5/25/2023",
              "accumulated_duration": 76,
              "sessions": [
                {
                  "begin": new Date("2023-05-25T09:03:00.000Z"),
                  "duration": 76,
                  "final_score": 0.225,
                  "final_history_score": 0.403
                }
              ],
              "last_score": 0.225
            },
            {
              "date": "5/26/2023",
              "accumulated_duration": 548,
              "sessions": [
                {
                  "begin": new Date("2023-05-26T10:32:04.000Z"),
                  "duration": 482,
                  "final_score": 0.231,
                  "final_history_score": 0.318
                },
                {
                  "begin": new Date("2023-05-26T11:31:13.000Z"),
                  "duration": 28,
                  "final_score": 0.232,
                  "final_history_score": 0.234
                },
                {
                  "begin": new Date("2023-05-26T11:31:13.000Z"),
                  "duration": 38,
                  "final_score": 0.231,
                  "final_history_score": 0.425
                }
              ],
              "last_score": 0.231
            },
            {
              "date": "5/27/2023",
              "accumulated_duration": 2241,
              "sessions": [
                {
                  "begin": new Date("2023-05-27T13:17:09.000Z"),
                  "duration": 100,
                  "final_score": 0.231,
                  "final_history_score": 0.458
                },
                {
                  "begin": new Date("2023-05-27T14:03:10.000Z"),
                  "duration": 437,
                  "final_score": 0.232,
                  "final_history_score": 0.398
                },
                {
                  "begin": new Date("2023-05-27T14:35:50.000Z"),
                  "duration": 231,
                  "final_score": 0.232,
                  "final_history_score": 0.054
                },
                {
                  "begin": new Date("2023-05-27T15:27:03.000Z"),
                  "duration": 341,
                  "final_score": 0.245,
                  "final_history_score": 0.63
                },
                {
                  "begin": new Date("2023-05-27T15:53:59.000Z"),
                  "duration": 391,
                  "final_score": 0.237,
                  "final_history_score": 0.329
                },
                {
                  "begin": new Date("2023-05-27T16:50:08.000Z"),
                  "duration": 310,
                  "final_score": 0.249,
                  "final_history_score": 0.285
                },
                {
                  "begin": new Date("2023-05-27T18:15:30.000Z"),
                  "duration": 57,
                  "final_score": 0.239,
                  "final_history_score": 0.782
                },
                {
                  "begin": new Date("2023-05-27T19:37:12.000Z"),
                  "duration": 29,
                  "final_score": 0.242,
                  "final_history_score": 0.325
                },
                {
                  "begin": new Date("2023-05-27T19:37:12.000Z"),
                  "duration": 345,
                  "final_score": 0.243,
                  "final_history_score": 0.525
                }
              ],
              "last_score": 0.243
            },
            {
              "date": "5/28/2023",
              "accumulated_duration": 725,
              "sessions": [
                {
                  "begin": new Date("2023-05-28T09:17:41.000Z"),
                  "duration": 245,
                  "final_score": 0.251,
                  "final_history_score": 0.179
                },
                {
                  "begin": new Date("2023-05-28T10:00:05.000Z"),
                  "duration": 141,
                  "final_score": 0.244,
                  "final_history_score": 0.455
                },
                {
                  "begin": new Date("2023-05-28T10:00:05.000Z"),
                  "duration": 339,
                  "final_score": 0.254,
                  "final_history_score": 0.588
                }
              ],
              "last_score": 0.254
            },
            {
              "date": "5/29/2023",
              "accumulated_duration": 1088,
              "sessions": [
                {
                  "begin": new Date("2023-05-29T10:24:27.000Z"),
                  "duration": 61,
                  "final_score": 0.263,
                  "final_history_score": 0.161
                },
                {
                  "begin": new Date("2023-05-29T10:54:20.000Z"),
                  "duration": 8,
                  "final_score": 0.264,
                  "final_history_score": 0.082
                },
                {
                  "begin": new Date("2023-05-29T11:33:02.000Z"),
                  "duration": 27,
                  "final_score": 0.265,
                  "final_history_score": 0.31
                },
                {
                  "begin": new Date("2023-05-29T12:41:07.000Z"),
                  "duration": 17,
                  "final_score": 0.272,
                  "final_history_score": 0.393
                },
                {
                  "begin": new Date("2023-05-29T13:43:15.000Z"),
                  "duration": 350,
                  "final_score": 0.264,
                  "final_history_score": 0.724
                },
                {
                  "begin": new Date("2023-05-29T14:54:11.000Z"),
                  "duration": 275,
                  "final_score": 0.258,
                  "final_history_score": 0.466
                },
                {
                  "begin": new Date("2023-05-29T14:54:11.000Z"),
                  "duration": 350,
                  "final_score": 0.265,
                  "final_history_score": 0.792
                }
              ],
              "last_score": 0.265
            },
            {
              "date": "5/30/2023",
              "accumulated_duration": 318,
              "sessions": [
                {
                  "begin": new Date("2023-05-30T11:09:01.000Z"),
                  "duration": 134,
                  "final_score": 0.282,
                  "final_history_score": 0.339
                },
                {
                  "begin": new Date("2023-05-30T11:09:01.000Z"),
                  "duration": 184,
                  "final_score": 0.27,
                  "final_history_score": 0.357
                }
              ],
              "last_score": 0.27
            },
            {
              "date": "6/1/2023",
              "accumulated_duration": 1490,
              "sessions": [
                {
                  "begin": new Date("2023-06-01T13:46:30.000Z"),
                  "duration": 433,
                  "final_score": 0.282,
                  "final_history_score": 0.073
                },
                {
                  "begin": new Date("2023-06-01T14:18:36.000Z"),
                  "duration": 474,
                  "final_score": 0.285,
                  "final_history_score": 0.585
                },
                {
                  "begin": new Date("2023-06-01T14:49:33.000Z"),
                  "duration": 218,
                  "final_score": 0.283,
                  "final_history_score": 0.617
                },
                {
                  "begin": new Date("2023-06-01T14:49:33.000Z"),
                  "duration": 365,
                  "final_score": 0.282,
                  "final_history_score": 0.352
                }
              ],
              "last_score": 0.282
            },
            {
              "date": "6/2/2023",
              "accumulated_duration": 1208,
              "sessions": [
                {
                  "begin": new Date("2023-06-02T11:42:10.000Z"),
                  "duration": 450,
                  "final_score": 0.283,
                  "final_history_score": 0.128
                },
                {
                  "begin": new Date("2023-06-02T12:37:09.000Z"),
                  "duration": 397,
                  "final_score": 0.283,
                  "final_history_score": 0.739
                },
                {
                  "begin": new Date("2023-06-02T12:37:09.000Z"),
                  "duration": 361,
                  "final_score": 0.287,
                  "final_history_score": 0.653
                }
              ],
              "last_score": 0.287
            },
            {
              "date": "6/3/2023",
              "accumulated_duration": 1486,
              "sessions": [
                {
                  "begin": new Date("2023-06-03T10:21:47.000Z"),
                  "duration": 454,
                  "final_score": 0.288,
                  "final_history_score": 0.303
                },
                {
                  "begin": new Date("2023-06-03T11:26:45.000Z"),
                  "duration": 421,
                  "final_score": 0.302,
                  "final_history_score": 0.105
                },
                {
                  "begin": new Date("2023-06-03T12:59:12.000Z"),
                  "duration": 468,
                  "final_score": 0.29,
                  "final_history_score": 0.13
                },
                {
                  "begin": new Date("2023-06-03T12:59:12.000Z"),
                  "duration": 143,
                  "final_score": 0.293,
                  "final_history_score": 0.002
                }
              ],
              "last_score": 0.293
            },
            {
              "date": "6/4/2023",
              "accumulated_duration": 2059,
              "sessions": [
                {
                  "begin": new Date("2023-06-04T12:14:53.000Z"),
                  "duration": 287,
                  "final_score": 0.302,
                  "final_history_score": 0.133
                },
                {
                  "begin": new Date("2023-06-04T13:43:30.000Z"),
                  "duration": 416,
                  "final_score": 0.305,
                  "final_history_score": 0.013
                },
                {
                  "begin": new Date("2023-06-04T15:09:46.000Z"),
                  "duration": 271,
                  "final_score": 0.297,
                  "final_history_score": 0.258
                },
                {
                  "begin": new Date("2023-06-04T16:09:24.000Z"),
                  "duration": 338,
                  "final_score": 0.307,
                  "final_history_score": 0.694
                },
                {
                  "begin": new Date("2023-06-04T16:35:14.000Z"),
                  "duration": 94,
                  "final_score": 0.309,
                  "final_history_score": 0.781
                },
                {
                  "begin": new Date("2023-06-04T17:06:04.000Z"),
                  "duration": 148,
                  "final_score": 0.309,
                  "final_history_score": 0.085
                },
                {
                  "begin": new Date("2023-06-04T17:28:46.000Z"),
                  "duration": 44,
                  "final_score": 0.295,
                  "final_history_score": 0.065
                },
                {
                  "begin": new Date("2023-06-04T17:28:46.000Z"),
                  "duration": 461,
                  "final_score": 0.312,
                  "final_history_score": 0.09
                }
              ],
              "last_score": 0.312
            },
            {
              "date": "6/5/2023",
              "accumulated_duration": 2356,
              "sessions": [
                {
                  "begin": new Date("2023-06-05T12:49:30.000Z"),
                  "duration": 360,
                  "final_score": 0.316,
                  "final_history_score": 0.21
                },
                {
                  "begin": new Date("2023-06-05T13:27:27.000Z"),
                  "duration": 424,
                  "final_score": 0.319,
                  "final_history_score": 0.622
                },
                {
                  "begin": new Date("2023-06-05T13:56:28.000Z"),
                  "duration": 332,
                  "final_score": 0.322,
                  "final_history_score": 0.649
                },
                {
                  "begin": new Date("2023-06-05T14:42:44.000Z"),
                  "duration": 117,
                  "final_score": 0.331,
                  "final_history_score": 0.552
                },
                {
                  "begin": new Date("2023-06-05T16:05:15.000Z"),
                  "duration": 182,
                  "final_score": 0.326,
                  "final_history_score": 0.763
                },
                {
                  "begin": new Date("2023-06-05T17:20:25.000Z"),
                  "duration": 485,
                  "final_score": 0.315,
                  "final_history_score": 0.577
                },
                {
                  "begin": new Date("2023-06-05T17:20:25.000Z"),
                  "duration": 456,
                  "final_score": 0.327,
                  "final_history_score": 0.086
                }
              ],
              "last_score": 0.327
            },
            {
              "date": "6/6/2023",
              "accumulated_duration": 1846,
              "sessions": [
                {
                  "begin": new Date("2023-06-06T11:49:49.000Z"),
                  "duration": 206,
                  "final_score": 0.332,
                  "final_history_score": 0.497
                },
                {
                  "begin": new Date("2023-06-06T12:51:44.000Z"),
                  "duration": 193,
                  "final_score": 0.331,
                  "final_history_score": 0.408
                },
                {
                  "begin": new Date("2023-06-06T14:10:05.000Z"),
                  "duration": 315,
                  "final_score": 0.331,
                  "final_history_score": 0.416
                },
                {
                  "begin": new Date("2023-06-06T15:22:38.000Z"),
                  "duration": 74,
                  "final_score": 0.331,
                  "final_history_score": 0.475
                },
                {
                  "begin": new Date("2023-06-06T16:13:29.000Z"),
                  "duration": 229,
                  "final_score": 0.344,
                  "final_history_score": 0.541
                },
                {
                  "begin": new Date("2023-06-06T17:30:40.000Z"),
                  "duration": 428,
                  "final_score": 0.33,
                  "final_history_score": 0.647
                },
                {
                  "begin": new Date("2023-06-06T17:30:40.000Z"),
                  "duration": 401,
                  "final_score": 0.327,
                  "final_history_score": 0.079
                }
              ],
              "last_score": 0.327
            },
            {
              "date": "6/8/2023",
              "accumulated_duration": 960,
              "sessions": [
                {
                  "begin": new Date("2023-06-08T09:29:59.000Z"),
                  "duration": 401,
                  "final_score": 0.346,
                  "final_history_score": 0.787
                },
                {
                  "begin": new Date("2023-06-08T10:18:17.000Z"),
                  "duration": 446,
                  "final_score": 0.343,
                  "final_history_score": 0.052
                },
                {
                  "begin": new Date("2023-06-08T10:18:17.000Z"),
                  "duration": 113,
                  "final_score": 0.338,
                  "final_history_score": 0.594
                }
              ],
              "last_score": 0.338
            },
            {
              "date": "6/9/2023",
              "accumulated_duration": 1666,
              "sessions": [
                {
                  "begin": new Date("2023-06-09T09:46:16.000Z"),
                  "duration": 491,
                  "final_score": 0.348,
                  "final_history_score": 0.511
                },
                {
                  "begin": new Date("2023-06-09T11:00:10.000Z"),
                  "duration": 375,
                  "final_score": 0.34,
                  "final_history_score": 0.185
                },
                {
                  "begin": new Date("2023-06-09T11:46:14.000Z"),
                  "duration": 297,
                  "final_score": 0.357,
                  "final_history_score": 0.097
                },
                {
                  "begin": new Date("2023-06-09T12:36:04.000Z"),
                  "duration": 31,
                  "final_score": 0.342,
                  "final_history_score": 0.63
                },
                {
                  "begin": new Date("2023-06-09T12:36:04.000Z"),
                  "duration": 472,
                  "final_score": 0.339,
                  "final_history_score": 0.054
                }
              ],
              "last_score": 0.339
            },
            {
              "date": "6/10/2023",
              "accumulated_duration": 2279,
              "sessions": [
                {
                  "begin": new Date("2023-06-10T12:50:17.000Z"),
                  "duration": 128,
                  "final_score": 0.352,
                  "final_history_score": 0.229
                },
                {
                  "begin": new Date("2023-06-10T13:29:55.000Z"),
                  "duration": 179,
                  "final_score": 0.356,
                  "final_history_score": 0.228
                },
                {
                  "begin": new Date("2023-06-10T14:48:15.000Z"),
                  "duration": 453,
                  "final_score": 0.358,
                  "final_history_score": 0.015
                },
                {
                  "begin": new Date("2023-06-10T15:33:26.000Z"),
                  "duration": 384,
                  "final_score": 0.351,
                  "final_history_score": 0.632
                },
                {
                  "begin": new Date("2023-06-10T16:28:02.000Z"),
                  "duration": 254,
                  "final_score": 0.357,
                  "final_history_score": 0.686
                },
                {
                  "begin": new Date("2023-06-10T16:51:52.000Z"),
                  "duration": 135,
                  "final_score": 0.357,
                  "final_history_score": 0.073
                },
                {
                  "begin": new Date("2023-06-10T18:17:20.000Z"),
                  "duration": 246,
                  "final_score": 0.348,
                  "final_history_score": 0.752
                },
                {
                  "begin": new Date("2023-06-10T19:36:17.000Z"),
                  "duration": 429,
                  "final_score": 0.347,
                  "final_history_score": 0.521
                },
                {
                  "begin": new Date("2023-06-10T19:36:17.000Z"),
                  "duration": 71,
                  "final_score": 0.357,
                  "final_history_score": 0.507
                }
              ],
              "last_score": 0.357
            },
            {
              "date": "6/11/2023",
              "accumulated_duration": 1511,
              "sessions": [
                {
                  "begin": new Date("2023-06-11T10:04:37.000Z"),
                  "duration": 350,
                  "final_score": 0.373,
                  "final_history_score": 0.559
                },
                {
                  "begin": new Date("2023-06-11T10:58:39.000Z"),
                  "duration": 404,
                  "final_score": 0.36,
                  "final_history_score": 0.228
                },
                {
                  "begin": new Date("2023-06-11T11:52:37.000Z"),
                  "duration": 105,
                  "final_score": 0.373,
                  "final_history_score": 0.13
                },
                {
                  "begin": new Date("2023-06-11T12:57:22.000Z"),
                  "duration": 441,
                  "final_score": 0.371,
                  "final_history_score": 0.261
                },
                {
                  "begin": new Date("2023-06-11T14:05:33.000Z"),
                  "duration": 78,
                  "final_score": 0.371,
                  "final_history_score": 0.021
                },
                {
                  "begin": new Date("2023-06-11T14:05:33.000Z"),
                  "duration": 133,
                  "final_score": 0.357,
                  "final_history_score": 0.043
                }
              ],
              "last_score": 0.357
            },
            {
              "date": "6/13/2023",
              "accumulated_duration": 1980,
              "sessions": [
                {
                  "begin": new Date("2023-06-13T09:22:04.000Z"),
                  "duration": 376,
                  "final_score": 0.37,
                  "final_history_score": 0.408
                },
                {
                  "begin": new Date("2023-06-13T10:45:14.000Z"),
                  "duration": 294,
                  "final_score": 0.367,
                  "final_history_score": 0.569
                },
                {
                  "begin": new Date("2023-06-13T11:33:26.000Z"),
                  "duration": 130,
                  "final_score": 0.366,
                  "final_history_score": 0.256
                },
                {
                  "begin": new Date("2023-06-13T12:18:15.000Z"),
                  "duration": 371,
                  "final_score": 0.374,
                  "final_history_score": 0.697
                },
                {
                  "begin": new Date("2023-06-13T13:14:18.000Z"),
                  "duration": 13,
                  "final_score": 0.362,
                  "final_history_score": 0.271
                },
                {
                  "begin": new Date("2023-06-13T14:07:00.000Z"),
                  "duration": 120,
                  "final_score": 0.37,
                  "final_history_score": 0.302
                },
                {
                  "begin": new Date("2023-06-13T15:02:36.000Z"),
                  "duration": 336,
                  "final_score": 0.37,
                  "final_history_score": 0.167
                },
                {
                  "begin": new Date("2023-06-13T15:02:36.000Z"),
                  "duration": 340,
                  "final_score": 0.374,
                  "final_history_score": 0.645
                }
              ],
              "last_score": 0.374
            },
            {
              "date": "6/14/2023",
              "accumulated_duration": 158,
              "sessions": [
                {
                  "begin": new Date("2023-06-14T11:00:00.000Z"),
                  "duration": 158,
                  "final_score": 0.378,
                  "final_history_score": 0.053
                }
              ],
              "last_score": 0.378
            },
            {
              "date": "6/15/2023",
              "accumulated_duration": 1586,
              "sessions": [
                {
                  "begin": new Date("2023-06-15T13:46:07.000Z"),
                  "duration": 277,
                  "final_score": 0.391,
                  "final_history_score": 0.419
                },
                {
                  "begin": new Date("2023-06-15T14:48:31.000Z"),
                  "duration": 401,
                  "final_score": 0.398,
                  "final_history_score": 0.666
                },
                {
                  "begin": new Date("2023-06-15T15:16:27.000Z"),
                  "duration": 133,
                  "final_score": 0.386,
                  "final_history_score": 0.52
                },
                {
                  "begin": new Date("2023-06-15T16:12:35.000Z"),
                  "duration": 369,
                  "final_score": 0.397,
                  "final_history_score": 0.795
                },
                {
                  "begin": new Date("2023-06-15T17:00:31.000Z"),
                  "duration": 26,
                  "final_score": 0.382,
                  "final_history_score": 0.571
                },
                {
                  "begin": new Date("2023-06-15T17:54:08.000Z"),
                  "duration": 346,
                  "final_score": 0.385,
                  "final_history_score": 0.049
                },
                {
                  "begin": new Date("2023-06-15T17:54:08.000Z"),
                  "duration": 34,
                  "final_score": 0.388,
                  "final_history_score": 0.679
                }
              ],
              "last_score": 0.388
            },
            {
              "date": "6/16/2023",
              "accumulated_duration": 1314,
              "sessions": [
                {
                  "begin": new Date("2023-06-16T11:14:59.000Z"),
                  "duration": 412,
                  "final_score": 0.392,
                  "final_history_score": 0.406
                },
                {
                  "begin": new Date("2023-06-16T12:11:34.000Z"),
                  "duration": 269,
                  "final_score": 0.407,
                  "final_history_score": 0.077
                },
                {
                  "begin": new Date("2023-06-16T13:38:08.000Z"),
                  "duration": 277,
                  "final_score": 0.391,
                  "final_history_score": 0.56
                },
                {
                  "begin": new Date("2023-06-16T14:47:43.000Z"),
                  "duration": 335,
                  "final_score": 0.4,
                  "final_history_score": 0.576
                },
                {
                  "begin": new Date("2023-06-16T14:47:43.000Z"),
                  "duration": 21,
                  "final_score": 0.404,
                  "final_history_score": 0.091
                }
              ],
              "last_score": 0.404
            },
            {
              "date": "6/17/2023",
              "accumulated_duration": 1455,
              "sessions": [
                {
                  "begin": new Date("2023-06-17T12:19:30.000Z"),
                  "duration": 192,
                  "final_score": 0.405,
                  "final_history_score": 0.082
                },
                {
                  "begin": new Date("2023-06-17T13:21:11.000Z"),
                  "duration": 344,
                  "final_score": 0.416,
                  "final_history_score": 0.794
                },
                {
                  "begin": new Date("2023-06-17T14:19:04.000Z"),
                  "duration": 201,
                  "final_score": 0.418,
                  "final_history_score": 0.333
                },
                {
                  "begin": new Date("2023-06-17T15:46:51.000Z"),
                  "duration": 455,
                  "final_score": 0.423,
                  "final_history_score": 0.366
                },
                {
                  "begin": new Date("2023-06-17T15:46:51.000Z"),
                  "duration": 263,
                  "final_score": 0.416,
                  "final_history_score": 0.016
                }
              ],
              "last_score": 0.416
            },
            {
              "date": "6/18/2023",
              "accumulated_duration": 1793,
              "sessions": [
                {
                  "begin": new Date("2023-06-18T11:32:28.000Z"),
                  "duration": 83,
                  "final_score": 0.416,
                  "final_history_score": 0.135
                },
                {
                  "begin": new Date("2023-06-18T13:00:26.000Z"),
                  "duration": 486,
                  "final_score": 0.426,
                  "final_history_score": 0.777
                },
                {
                  "begin": new Date("2023-06-18T13:31:16.000Z"),
                  "duration": 52,
                  "final_score": 0.418,
                  "final_history_score": 0.585
                },
                {
                  "begin": new Date("2023-06-18T14:37:23.000Z"),
                  "duration": 327,
                  "final_score": 0.421,
                  "final_history_score": 0.642
                },
                {
                  "begin": new Date("2023-06-18T15:35:50.000Z"),
                  "duration": 350,
                  "final_score": 0.426,
                  "final_history_score": 0.701
                },
                {
                  "begin": new Date("2023-06-18T16:08:47.000Z"),
                  "duration": 432,
                  "final_score": 0.435,
                  "final_history_score": 0.418
                },
                {
                  "begin": new Date("2023-06-18T16:08:47.000Z"),
                  "duration": 63,
                  "final_score": 0.416,
                  "final_history_score": 0.616
                }
              ],
              "last_score": 0.416
            },
            {
              "date": "6/19/2023",
              "accumulated_duration": 543,
              "sessions": [
                {
                  "begin": new Date("2023-06-19T11:43:01.000Z"),
                  "duration": 291,
                  "final_score": 0.428,
                  "final_history_score": 0.628
                },
                {
                  "begin": new Date("2023-06-19T11:43:01.000Z"),
                  "duration": 252,
                  "final_score": 0.421,
                  "final_history_score": 0.345
                }
              ],
              "last_score": 0.421
            },
            {
              "date": "6/21/2023",
              "accumulated_duration": 1987,
              "sessions": [
                {
                  "begin": new Date("2023-06-21T10:39:03.000Z"),
                  "duration": 106,
                  "final_score": 0.437,
                  "final_history_score": 0.406
                },
                {
                  "begin": new Date("2023-06-21T11:10:14.000Z"),
                  "duration": 379,
                  "final_score": 0.426,
                  "final_history_score": 0.038
                },
                {
                  "begin": new Date("2023-06-21T12:38:42.000Z"),
                  "duration": 294,
                  "final_score": 0.434,
                  "final_history_score": 0.637
                },
                {
                  "begin": new Date("2023-06-21T13:26:23.000Z"),
                  "duration": 310,
                  "final_score": 0.432,
                  "final_history_score": 0.565
                },
                {
                  "begin": new Date("2023-06-21T14:31:52.000Z"),
                  "duration": 27,
                  "final_score": 0.437,
                  "final_history_score": 0.455
                },
                {
                  "begin": new Date("2023-06-21T15:40:19.000Z"),
                  "duration": 101,
                  "final_score": 0.431,
                  "final_history_score": 0.418
                },
                {
                  "begin": new Date("2023-06-21T16:58:48.000Z"),
                  "duration": 215,
                  "final_score": 0.426,
                  "final_history_score": 0.555
                },
                {
                  "begin": new Date("2023-06-21T18:22:24.000Z"),
                  "duration": 274,
                  "final_score": 0.429,
                  "final_history_score": 0.732
                },
                {
                  "begin": new Date("2023-06-21T18:52:17.000Z"),
                  "duration": 242,
                  "final_score": 0.427,
                  "final_history_score": 0.062
                },
                {
                  "begin": new Date("2023-06-21T18:52:17.000Z"),
                  "duration": 39,
                  "final_score": 0.427,
                  "final_history_score": 0.393
                }
              ],
              "last_score": 0.427
            },
            {
              "date": "6/22/2023",
              "accumulated_duration": 2197,
              "sessions": [
                {
                  "begin": new Date("2023-06-22T10:01:22.000Z"),
                  "duration": 403,
                  "final_score": 0.432,
                  "final_history_score": 0.477
                },
                {
                  "begin": new Date("2023-06-22T10:51:13.000Z"),
                  "duration": 497,
                  "final_score": 0.432,
                  "final_history_score": 0.284
                },
                {
                  "begin": new Date("2023-06-22T11:27:37.000Z"),
                  "duration": 222,
                  "final_score": 0.44,
                  "final_history_score": 0.159
                },
                {
                  "begin": new Date("2023-06-22T11:59:08.000Z"),
                  "duration": 217,
                  "final_score": 0.428,
                  "final_history_score": 0.111
                },
                {
                  "begin": new Date("2023-06-22T13:33:09.000Z"),
                  "duration": 493,
                  "final_score": 0.429,
                  "final_history_score": 0.101
                },
                {
                  "begin": new Date("2023-06-22T14:41:24.000Z"),
                  "duration": 144,
                  "final_score": 0.445,
                  "final_history_score": 0.37
                },
                {
                  "begin": new Date("2023-06-22T16:05:06.000Z"),
                  "duration": 51,
                  "final_score": 0.431,
                  "final_history_score": 0.2
                },
                {
                  "begin": new Date("2023-06-22T16:05:06.000Z"),
                  "duration": 170,
                  "final_score": 0.442,
                  "final_history_score": 0.697
                }
              ],
              "last_score": 0.442
            },
            {
              "date": "6/23/2023",
              "accumulated_duration": 764,
              "sessions": [
                {
                  "begin": new Date("2023-06-23T12:26:40.000Z"),
                  "duration": 85,
                  "final_score": 0.455,
                  "final_history_score": 0.556
                },
                {
                  "begin": new Date("2023-06-23T13:08:55.000Z"),
                  "duration": 410,
                  "final_score": 0.457,
                  "final_history_score": 0.173
                },
                {
                  "begin": new Date("2023-06-23T13:08:55.000Z"),
                  "duration": 269,
                  "final_score": 0.45,
                  "final_history_score": 0.139
                }
              ],
              "last_score": 0.45
            },
            {
              "date": "6/24/2023",
              "accumulated_duration": 1771,
              "sessions": [
                {
                  "begin": new Date("2023-06-24T13:54:56.000Z"),
                  "duration": 435,
                  "final_score": 0.467,
                  "final_history_score": 0.127
                },
                {
                  "begin": new Date("2023-06-24T15:20:15.000Z"),
                  "duration": 158,
                  "final_score": 0.459,
                  "final_history_score": 0.297
                },
                {
                  "begin": new Date("2023-06-24T16:24:22.000Z"),
                  "duration": 457,
                  "final_score": 0.467,
                  "final_history_score": 0.657
                },
                {
                  "begin": new Date("2023-06-24T16:59:03.000Z"),
                  "duration": 226,
                  "final_score": 0.45,
                  "final_history_score": 0.34
                },
                {
                  "begin": new Date("2023-06-24T17:28:55.000Z"),
                  "duration": 418,
                  "final_score": 0.453,
                  "final_history_score": 0.525
                },
                {
                  "begin": new Date("2023-06-24T17:28:55.000Z"),
                  "duration": 77,
                  "final_score": 0.462,
                  "final_history_score": 0.232
                }
              ],
              "last_score": 0.462
            },
            {
              "date": "6/25/2023",
              "accumulated_duration": 1634,
              "sessions": [
                {
                  "begin": new Date("2023-06-25T12:15:03.000Z"),
                  "duration": 193,
                  "final_score": 0.48,
                  "final_history_score": 0.63
                },
                {
                  "begin": new Date("2023-06-25T13:25:46.000Z"),
                  "duration": 99,
                  "final_score": 0.465,
                  "final_history_score": 0.714
                },
                {
                  "begin": new Date("2023-06-25T14:10:46.000Z"),
                  "duration": 168,
                  "final_score": 0.478,
                  "final_history_score": 0.758
                },
                {
                  "begin": new Date("2023-06-25T14:59:19.000Z"),
                  "duration": 474,
                  "final_score": 0.476,
                  "final_history_score": 0.662
                },
                {
                  "begin": new Date("2023-06-25T15:57:53.000Z"),
                  "duration": 301,
                  "final_score": 0.476,
                  "final_history_score": 0.018
                },
                {
                  "begin": new Date("2023-06-25T16:48:46.000Z"),
                  "duration": 15,
                  "final_score": 0.468,
                  "final_history_score": 0.084
                },
                {
                  "begin": new Date("2023-06-25T18:09:48.000Z"),
                  "duration": 181,
                  "final_score": 0.481,
                  "final_history_score": 0.147
                },
                {
                  "begin": new Date("2023-06-25T19:10:05.000Z"),
                  "duration": 39,
                  "final_score": 0.481,
                  "final_history_score": 0.063
                },
                {
                  "begin": new Date("2023-06-25T20:06:20.000Z"),
                  "duration": 33,
                  "final_score": 0.479,
                  "final_history_score": 0.102
                },
                {
                  "begin": new Date("2023-06-25T20:06:20.000Z"),
                  "duration": 131,
                  "final_score": 0.476,
                  "final_history_score": 0.626
                }
              ],
              "last_score": 0.476
            },
            {
              "date": "6/27/2023",
              "accumulated_duration": 1300,
              "sessions": [
                {
                  "begin": new Date("2023-06-27T10:39:04.000Z"),
                  "duration": 195,
                  "final_score": 0.485,
                  "final_history_score": 0.02
                },
                {
                  "begin": new Date("2023-06-27T11:27:02.000Z"),
                  "duration": 268,
                  "final_score": 0.493,
                  "final_history_score": 0.776
                },
                {
                  "begin": new Date("2023-06-27T12:08:27.000Z"),
                  "duration": 366,
                  "final_score": 0.48,
                  "final_history_score": 0.491
                },
                {
                  "begin": new Date("2023-06-27T13:07:47.000Z"),
                  "duration": 53,
                  "final_score": 0.485,
                  "final_history_score": 0.299
                },
                {
                  "begin": new Date("2023-06-27T14:13:14.000Z"),
                  "duration": 242,
                  "final_score": 0.478,
                  "final_history_score": 0.515
                },
                {
                  "begin": new Date("2023-06-27T14:13:14.000Z"),
                  "duration": 176,
                  "final_score": 0.492,
                  "final_history_score": 0.035
                }
              ],
              "last_score": 0.492
            },
            {
              "date": "6/30/2023",
              "accumulated_duration": 189,
              "sessions": [
                {
                  "begin": new Date("2023-06-30T10:42:00.000Z"),
                  "duration": 189,
                  "final_score": 0.496,
                  "final_history_score": 0.639
                }
              ],
              "last_score": 0.496
            },
            {
              "date": "7/1/2023",
              "accumulated_duration": 1445,
              "sessions": [
                {
                  "begin": new Date("2023-07-01T11:44:03.000Z"),
                  "duration": 205,
                  "final_score": 0.507,
                  "final_history_score": 0.383
                },
                {
                  "begin": new Date("2023-07-01T12:50:33.000Z"),
                  "duration": 73,
                  "final_score": 0.496,
                  "final_history_score": 0.132
                },
                {
                  "begin": new Date("2023-07-01T13:55:17.000Z"),
                  "duration": 411,
                  "final_score": 0.506,
                  "final_history_score": 0.447
                },
                {
                  "begin": new Date("2023-07-01T14:39:37.000Z"),
                  "duration": 361,
                  "final_score": 0.515,
                  "final_history_score": 0.431
                },
                {
                  "begin": new Date("2023-07-01T15:05:38.000Z"),
                  "duration": 7,
                  "final_score": 0.507,
                  "final_history_score": 0.029
                },
                {
                  "begin": new Date("2023-07-01T16:34:36.000Z"),
                  "duration": 203,
                  "final_score": 0.508,
                  "final_history_score": 0.214
                },
                {
                  "begin": new Date("2023-07-01T16:57:00.000Z"),
                  "duration": 59,
                  "final_score": 0.512,
                  "final_history_score": 0.075
                },
                {
                  "begin": new Date("2023-07-01T18:21:57.000Z"),
                  "duration": 10,
                  "final_score": 0.511,
                  "final_history_score": 0.633
                },
                {
                  "begin": new Date("2023-07-01T18:21:57.000Z"),
                  "duration": 116,
                  "final_score": 0.506,
                  "final_history_score": 0.359
                }
              ],
              "last_score": 0.506
            },
            {
              "date": "7/2/2023",
              "accumulated_duration": 688,
              "sessions": [
                {
                  "begin": new Date("2023-07-02T10:56:57.000Z"),
                  "duration": 141,
                  "final_score": 0.508,
                  "final_history_score": 0.764
                },
                {
                  "begin": new Date("2023-07-02T11:58:16.000Z"),
                  "duration": 66,
                  "final_score": 0.522,
                  "final_history_score": 0.271
                },
                {
                  "begin": new Date("2023-07-02T11:58:16.000Z"),
                  "duration": 481,
                  "final_score": 0.511,
                  "final_history_score": 0.117
                }
              ],
              "last_score": 0.511
            },
            {
              "date": "7/4/2023",
              "accumulated_duration": 1443,
              "sessions": [
                {
                  "begin": new Date("2023-07-04T10:19:20.000Z"),
                  "duration": 362,
                  "final_score": 0.531,
                  "final_history_score": 0.182
                },
                {
                  "begin": new Date("2023-07-04T10:49:34.000Z"),
                  "duration": 195,
                  "final_score": 0.53,
                  "final_history_score": 0.528
                },
                {
                  "begin": new Date("2023-07-04T11:47:16.000Z"),
                  "duration": 241,
                  "final_score": 0.518,
                  "final_history_score": 0.449
                },
                {
                  "begin": new Date("2023-07-04T12:16:19.000Z"),
                  "duration": 168,
                  "final_score": 0.53,
                  "final_history_score": 0.579
                },
                {
                  "begin": new Date("2023-07-04T12:16:19.000Z"),
                  "duration": 477,
                  "final_score": 0.519,
                  "final_history_score": 0.729
                }
              ],
              "last_score": 0.519
            },
            {
              "date": "7/5/2023",
              "accumulated_duration": 2018,
              "sessions": [
                {
                  "begin": new Date("2023-07-05T13:24:45.000Z"),
                  "duration": 330,
                  "final_score": 0.537,
                  "final_history_score": 0.265
                },
                {
                  "begin": new Date("2023-07-05T14:41:44.000Z"),
                  "duration": 413,
                  "final_score": 0.526,
                  "final_history_score": 0.792
                },
                {
                  "begin": new Date("2023-07-05T15:48:08.000Z"),
                  "duration": 308,
                  "final_score": 0.535,
                  "final_history_score": 0.318
                },
                {
                  "begin": new Date("2023-07-05T16:44:43.000Z"),
                  "duration": 123,
                  "final_score": 0.52,
                  "final_history_score": 0.71
                },
                {
                  "begin": new Date("2023-07-05T17:59:04.000Z"),
                  "duration": 359,
                  "final_score": 0.532,
                  "final_history_score": 0.334
                },
                {
                  "begin": new Date("2023-07-05T18:48:04.000Z"),
                  "duration": 103,
                  "final_score": 0.529,
                  "final_history_score": 0.565
                },
                {
                  "begin": new Date("2023-07-05T20:17:35.000Z"),
                  "duration": 270,
                  "final_score": 0.525,
                  "final_history_score": 0.34
                },
                {
                  "begin": new Date("2023-07-05T20:17:35.000Z"),
                  "duration": 112,
                  "final_score": 0.533,
                  "final_history_score": 0.708
                }
              ],
              "last_score": 0.533
            },
            {
              "date": "7/7/2023",
              "accumulated_duration": 850,
              "sessions": [
                {
                  "begin": new Date("2023-07-07T11:58:00.000Z"),
                  "duration": 202,
                  "final_score": 0.544,
                  "final_history_score": 0.438
                },
                {
                  "begin": new Date("2023-07-07T13:08:51.000Z"),
                  "duration": 342,
                  "final_score": 0.539,
                  "final_history_score": 0.493
                },
                {
                  "begin": new Date("2023-07-07T13:08:51.000Z"),
                  "duration": 306,
                  "final_score": 0.551,
                  "final_history_score": 0.048
                }
              ],
              "last_score": 0.551
            },
            {
              "date": "7/8/2023",
              "accumulated_duration": 2411,
              "sessions": [
                {
                  "begin": new Date("2023-07-08T09:49:37.000Z"),
                  "duration": 409,
                  "final_score": 0.554,
                  "final_history_score": 0.644
                },
                {
                  "begin": new Date("2023-07-08T10:24:06.000Z"),
                  "duration": 412,
                  "final_score": 0.555,
                  "final_history_score": 0.719
                },
                {
                  "begin": new Date("2023-07-08T10:53:02.000Z"),
                  "duration": 328,
                  "final_score": 0.554,
                  "final_history_score": 0.637
                },
                {
                  "begin": new Date("2023-07-08T11:36:32.000Z"),
                  "duration": 308,
                  "final_score": 0.565,
                  "final_history_score": 0.077
                },
                {
                  "begin": new Date("2023-07-08T12:15:27.000Z"),
                  "duration": 344,
                  "final_score": 0.557,
                  "final_history_score": 0.782
                },
                {
                  "begin": new Date("2023-07-08T13:41:47.000Z"),
                  "duration": 56,
                  "final_score": 0.562,
                  "final_history_score": 0.314
                },
                {
                  "begin": new Date("2023-07-08T14:37:12.000Z"),
                  "duration": 62,
                  "final_score": 0.555,
                  "final_history_score": 0.161
                },
                {
                  "begin": new Date("2023-07-08T15:44:39.000Z"),
                  "duration": 87,
                  "final_score": 0.551,
                  "final_history_score": 0.527
                },
                {
                  "begin": new Date("2023-07-08T16:42:53.000Z"),
                  "duration": 75,
                  "final_score": 0.57,
                  "final_history_score": 0.332
                },
                {
                  "begin": new Date("2023-07-08T16:42:53.000Z"),
                  "duration": 330,
                  "final_score": 0.557,
                  "final_history_score": 0.708
                }
              ],
              "last_score": 0.557
            },
            {
              "date": "7/10/2023",
              "accumulated_duration": 69,
              "sessions": [
                {
                  "begin": new Date("2023-07-10T11:31:00.000Z"),
                  "duration": 69,
                  "final_score": 0.571,
                  "final_history_score": 0.195
                }
              ],
              "last_score": 0.571
            },
            {
              "date": "7/12/2023",
              "accumulated_duration": 1220,
              "sessions": [
                {
                  "begin": new Date("2023-07-12T14:28:59.000Z"),
                  "duration": 399,
                  "final_score": 0.589,
                  "final_history_score": 0.282
                },
                {
                  "begin": new Date("2023-07-12T15:51:20.000Z"),
                  "duration": 402,
                  "final_score": 0.574,
                  "final_history_score": 0.113
                },
                {
                  "begin": new Date("2023-07-12T16:41:19.000Z"),
                  "duration": 84,
                  "final_score": 0.58,
                  "final_history_score": 0.604
                },
                {
                  "begin": new Date("2023-07-12T16:41:19.000Z"),
                  "duration": 335,
                  "final_score": 0.584,
                  "final_history_score": 0.553
                }
              ],
              "last_score": 0.584
            },
            {
              "date": "7/13/2023",
              "accumulated_duration": 1926,
              "sessions": [
                {
                  "begin": new Date("2023-07-13T13:02:30.000Z"),
                  "duration": 176,
                  "final_score": 0.59,
                  "final_history_score": 0.155
                },
                {
                  "begin": new Date("2023-07-13T14:18:10.000Z"),
                  "duration": 199,
                  "final_score": 0.591,
                  "final_history_score": 0.623
                },
                {
                  "begin": new Date("2023-07-13T14:59:45.000Z"),
                  "duration": 9,
                  "final_score": 0.603,
                  "final_history_score": 0.751
                },
                {
                  "begin": new Date("2023-07-13T16:03:42.000Z"),
                  "duration": 305,
                  "final_score": 0.603,
                  "final_history_score": 0.56
                },
                {
                  "begin": new Date("2023-07-13T16:57:42.000Z"),
                  "duration": 238,
                  "final_score": 0.602,
                  "final_history_score": 0.124
                },
                {
                  "begin": new Date("2023-07-13T18:23:03.000Z"),
                  "duration": 227,
                  "final_score": 0.599,
                  "final_history_score": 0.123
                },
                {
                  "begin": new Date("2023-07-13T19:27:04.000Z"),
                  "duration": 61,
                  "final_score": 0.585,
                  "final_history_score": 0.71
                },
                {
                  "begin": new Date("2023-07-13T20:18:32.000Z"),
                  "duration": 397,
                  "final_score": 0.601,
                  "final_history_score": 0.638
                },
                {
                  "begin": new Date("2023-07-13T21:19:10.000Z"),
                  "duration": 209,
                  "final_score": 0.585,
                  "final_history_score": 0.441
                },
                {
                  "begin": new Date("2023-07-13T21:19:10.000Z"),
                  "duration": 105,
                  "final_score": 0.598,
                  "final_history_score": 0.556
                }
              ],
              "last_score": 0.598
            },
            {
              "date": "7/14/2023",
              "accumulated_duration": 1116,
              "sessions": [
                {
                  "begin": new Date("2023-07-14T13:40:46.000Z"),
                  "duration": 46,
                  "final_score": 0.608,
                  "final_history_score": 0.616
                },
                {
                  "begin": new Date("2023-07-14T14:39:35.000Z"),
                  "duration": 283,
                  "final_score": 0.61,
                  "final_history_score": 0.652
                },
                {
                  "begin": new Date("2023-07-14T15:22:24.000Z"),
                  "duration": 211,
                  "final_score": 0.613,
                  "final_history_score": 0.012
                },
                {
                  "begin": new Date("2023-07-14T16:35:44.000Z"),
                  "duration": 176,
                  "final_score": 0.609,
                  "final_history_score": 0.644
                },
                {
                  "begin": new Date("2023-07-14T17:32:54.000Z"),
                  "duration": 96,
                  "final_score": 0.611,
                  "final_history_score": 0.74
                },
                {
                  "begin": new Date("2023-07-14T17:32:54.000Z"),
                  "duration": 304,
                  "final_score": 0.604,
                  "final_history_score": 0.743
                }
              ],
              "last_score": 0.604
            },
            {
              "date": "7/15/2023",
              "accumulated_duration": 2049,
              "sessions": [
                {
                  "begin": new Date("2023-07-15T11:44:07.000Z"),
                  "duration": 265,
                  "final_score": 0.623,
                  "final_history_score": 0.74
                },
                {
                  "begin": new Date("2023-07-15T12:46:24.000Z"),
                  "duration": 244,
                  "final_score": 0.622,
                  "final_history_score": 0.374
                },
                {
                  "begin": new Date("2023-07-15T14:04:06.000Z"),
                  "duration": 436,
                  "final_score": 0.617,
                  "final_history_score": 0.454
                },
                {
                  "begin": new Date("2023-07-15T15:19:21.000Z"),
                  "duration": 108,
                  "final_score": 0.604,
                  "final_history_score": 0.388
                },
                {
                  "begin": new Date("2023-07-15T16:40:16.000Z"),
                  "duration": 102,
                  "final_score": 0.623,
                  "final_history_score": 0.791
                },
                {
                  "begin": new Date("2023-07-15T17:19:50.000Z"),
                  "duration": 89,
                  "final_score": 0.624,
                  "final_history_score": 0.448
                },
                {
                  "begin": new Date("2023-07-15T17:54:49.000Z"),
                  "duration": 330,
                  "final_score": 0.623,
                  "final_history_score": 0.458
                },
                {
                  "begin": new Date("2023-07-15T18:37:44.000Z"),
                  "duration": 67,
                  "final_score": 0.615,
                  "final_history_score": 0.734
                },
                {
                  "begin": new Date("2023-07-15T18:37:44.000Z"),
                  "duration": 408,
                  "final_score": 0.619,
                  "final_history_score": 0.528
                }
              ],
              "last_score": 0.619
            },
            {
              "date": "7/16/2023",
              "accumulated_duration": 178,
              "sessions": [
                {
                  "begin": new Date("2023-07-16T11:54:00.000Z"),
                  "duration": 178,
                  "final_score": 0.638,
                  "final_history_score": 0.195
                }
              ],
              "last_score": 0.638
            },
            {
              "date": "7/17/2023",
              "accumulated_duration": 2365,
              "sessions": [
                {
                  "begin": new Date("2023-07-17T13:22:38.000Z"),
                  "duration": 205,
                  "final_score": 0.648,
                  "final_history_score": 0.581
                },
                {
                  "begin": new Date("2023-07-17T14:01:22.000Z"),
                  "duration": 367,
                  "final_score": 0.649,
                  "final_history_score": 0.586
                },
                {
                  "begin": new Date("2023-07-17T15:03:01.000Z"),
                  "duration": 83,
                  "final_score": 0.639,
                  "final_history_score": 0.349
                },
                {
                  "begin": new Date("2023-07-17T15:54:16.000Z"),
                  "duration": 333,
                  "final_score": 0.658,
                  "final_history_score": 0.748
                },
                {
                  "begin": new Date("2023-07-17T16:41:42.000Z"),
                  "duration": 460,
                  "final_score": 0.639,
                  "final_history_score": 0.34
                },
                {
                  "begin": new Date("2023-07-17T17:58:01.000Z"),
                  "duration": 473,
                  "final_score": 0.639,
                  "final_history_score": 0.376
                },
                {
                  "begin": new Date("2023-07-17T18:53:46.000Z"),
                  "duration": 107,
                  "final_score": 0.653,
                  "final_history_score": 0.314
                },
                {
                  "begin": new Date("2023-07-17T20:09:25.000Z"),
                  "duration": 297,
                  "final_score": 0.639,
                  "final_history_score": 0.69
                },
                {
                  "begin": new Date("2023-07-17T20:09:25.000Z"),
                  "duration": 40,
                  "final_score": 0.658,
                  "final_history_score": 0.369
                }
              ],
              "last_score": 0.658
            }
          ]
        }
      }

}
