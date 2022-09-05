import { Topic } from "../../../../src/modules/topic/entities/topic.entity";
import { Game } from "../../../../src/modules/game/entities/game.entity";
import { Question } from "../../../../src/modules/question/question.entity";
import { GameAnswerQuestion } from "../../../../src/modules/gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { GameStatus } from "../../../../src/modules/game/enums/statusGameEnum";

const topic = new Topic();
topic.id = 1;
const gameEntityFromDb = new Game();
const question = new Question();
const gameAnswerQuestion = new GameAnswerQuestion();

gameAnswerQuestion.answerIsCorrect = false;
gameAnswerQuestion.userAnswer = "";
gameAnswerQuestion.questionAsked = false;
gameAnswerQuestion.gameId = 1;
gameAnswerQuestion.id = 1;
gameAnswerQuestion.question = question;

question.id = 1;
question.point = 100;
question.desc = "описание";
question.answer = "успех";
question.gameAnswerQuestion = [gameAnswerQuestion];
question.topic = topic;

gameEntityFromDb.id = 1;
gameEntityFromDb.step = 0;
gameEntityFromDb.updatedDate = new Date();
gameEntityFromDb.status = GameStatus.Process;
gameEntityFromDb.totalScore = 0;
gameEntityFromDb.gameAnswerQuestion = [gameAnswerQuestion];

export { gameEntityFromDb };
