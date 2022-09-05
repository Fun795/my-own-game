import { Topic } from "../../../../src/modules/topic/entities/topic.entity";
import { Game } from "../../../../src/modules/game/entities/game.entity";
import { Question } from "../../../../src/modules/question/question.entity";
import { GameAnswerQuestion } from "../../../../src/modules/gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { GameStatus } from "../../../../src/modules/game/enums/statusGameEnum";

const topic = new Topic();
topic.id = 1;
const gameEntityFromEsb = new Game();
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

gameEntityFromEsb.id = 1;
gameEntityFromEsb.step = 0;
gameEntityFromEsb.updatedDate = new Date();
gameEntityFromEsb.status = GameStatus.Process;
gameEntityFromEsb.totalScore = 0;
gameEntityFromEsb.gameAnswerQuestion = [gameAnswerQuestion];

export { gameEntityFromEsb };
