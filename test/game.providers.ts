import { GameController } from "../src/modules/game/game.controller";
import { GameService } from "../src/modules/game/game.service";
import { QuestionService } from "../src/modules/question/question.service";
import { TopicService } from "../src/modules/topic/topic.service";
import { Question } from "../src/modules/question/question.entity";
import { GameQuestionAnswerService } from "../src/modules/gameQuestionsAnswer/game-question-answer.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Game } from "../src/modules/game/entities/game.entity";
import { repositoryMock } from "./mock/repository.mock";
import { GameAnswerQuestion } from "../src/modules/gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { getLoggerToken } from "nestjs-pino";
import { loggerMock } from "./mock/logger.mock";

export const providers = {
    controllers: [GameController],
    providers: [
        GameService,
        {
            provide: QuestionService,
            useValue: {
                findOne: jest.fn()
            }
        },
        {
            provide: TopicService,
            useValue: {
                topicToQuestion() {
                    return { questions: [new Question()] };
                },
                findOne: jest.fn()
            }
        },
        {
            provide: GameQuestionAnswerService,
            useValue: {
                findOne: jest.fn()
            }
        },
        {
            provide: getRepositoryToken(Game),
            useValue: repositoryMock
        },
        {
            provide: getRepositoryToken(GameAnswerQuestion),
            useValue: repositoryMock
        },
        {
            provide: getLoggerToken(GameService.name),
            useValue: loggerMock
        }
    ]
};
