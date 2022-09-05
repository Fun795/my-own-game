import { gameEntityFromDb } from "./gameEntityFromDb";
import { Game } from "../../../../src/modules/game/entities/game.entity";
// Load the full build.
import * as _ from "lodash";
import { cloneDeep, find, extend } from "lodash";
import { GameStatus } from "../../../../src/modules/game/enums/statusGameEnum";

export const gameEntityResultCorrectAnswer: Game = _.cloneDeep(gameEntityFromDb);

gameEntityResultCorrectAnswer.step = 1;
gameEntityResultCorrectAnswer.totalScore = 100;
gameEntityResultCorrectAnswer.gameAnswerQuestion[0].answerIsCorrect = true;
gameEntityResultCorrectAnswer.gameAnswerQuestion[0].questionAsked = true;
gameEntityResultCorrectAnswer.gameAnswerQuestion[0].userAnswer = "успех";

export const gameEntityResultNotCorrectAnswer: Game = _.cloneDeep(gameEntityFromDb);

gameEntityResultNotCorrectAnswer.step = 1;
gameEntityResultNotCorrectAnswer.totalScore = 0;
gameEntityResultNotCorrectAnswer.gameAnswerQuestion[0].answerIsCorrect = false;
gameEntityResultNotCorrectAnswer.gameAnswerQuestion[0].questionAsked = true;
gameEntityResultNotCorrectAnswer.gameAnswerQuestion[0].userAnswer = "не успех";

export const gameEntityResultFinishAnswer: Game = _.cloneDeep(gameEntityFromDb);

gameEntityResultFinishAnswer.step = 25;
gameEntityResultFinishAnswer.status = GameStatus.Finished;
gameEntityResultFinishAnswer.totalScore = 0;
gameEntityResultFinishAnswer.gameAnswerQuestion[0].answerIsCorrect = false;
gameEntityResultFinishAnswer.gameAnswerQuestion[0].questionAsked = true;
gameEntityResultFinishAnswer.gameAnswerQuestion[0].userAnswer = "Финиш";
