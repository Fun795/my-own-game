import { Test } from "@nestjs/testing";
import { GameService } from "../../../src/modules/game/game.service";
import { GameController } from "../../../src/modules/game/game.controller";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { getLoggerToken } from "nestjs-pino";
import { Game } from "../../../src/modules/game/entities/game.entity";
import { repositoryMock } from "../../mock/repository.mock";
import { TopicService } from "../../../src/modules/topic/topic.service";
import { Question } from "../../../src/modules/question/question.entity";
import { GameQuestionAnswerService } from "../../../src/modules/gameQuestionsAnswer/game-question-answer.service";
import { QuestionService } from "../../../src/modules/question/question.service";
import { loggerMock } from "../../mock/logger.mock";
import { GameAnswerQuestion } from "../../../src/modules/gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { GameStatus } from "../../../src/modules/game/enums/statusGameEnum";
import { gameEntityFromDb } from "./fixtures/gameEntityFromDb";
import { gameEntityResultCorrectAnswer, gameEntityResultNotCorrectAnswer } from "./fixtures/gameEntityResultAnswer";
import * as _ from "lodash";
import { QuestionCheckDto } from "../../../src/modules/question/dto";

let gameService: GameService;

describe("Game", () => {
    let app: INestApplication;
    let gameServiceMock: GameService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
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
                    provide: getLoggerToken(GameService.name), //provide: "PinoLogger:QuestionService",
                    useValue: loggerMock
                }
            ]
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        gameServiceMock = await app.resolve(GameService);
        await app.init();
        gameService = moduleRef.get<GameService>(GameService);
    });

    test("updated game if answer is correct", () => {
        const game = _.cloneDeep(gameEntityFromDb);
        const result = gameEntityResultCorrectAnswer;
        game.checkAnswer(1, "успех");
        expect(game).toEqual(result);
    });

    test("updated game if answer is not correct", () => {
        const game = _.cloneDeep(gameEntityFromDb);
        const result = gameEntityResultNotCorrectAnswer;
        game.checkAnswer(1, "не успех");
        expect(game).toEqual(result);
    });

    test("if step game equals 25, game must be finish", () => {
        const game = _.cloneDeep(gameEntityFromDb);
        game.step = 24;
        game.checkAnswer(1, "финиш");
        expect(game.status).toBe(GameStatus.Finished);
    });

    test("If The game you want to answer is already finish", async () => {
        const gameMock: Game = _.cloneDeep(gameEntityFromDb);
        gameMock.status = GameStatus.Finished;
        jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(gameMock);

        const questionCheckDto: QuestionCheckDto = {
            gameId: 1,
            questionAnswerId: 1,
            answer: "успех"
        };

        await expect(gameServiceMock.sendAnswer(questionCheckDto)).rejects.toThrow(
            "The game you want to answer is already finish"
        );
    });

    test("If Question is not included in game", async () => {
        const gameMock: Game = _.cloneDeep(gameEntityFromDb);
        jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(gameMock);

        const questionCheckDto: QuestionCheckDto = {
            gameId: 1,
            questionAnswerId: 3,
            answer: "успех"
        };

        await expect(gameServiceMock.sendAnswer(questionCheckDto)).rejects.toThrow(
            "Question is not included in this game"
        );
    });

    test("If this question has already been answered", async () => {
        const gameMock: Game = _.cloneDeep(gameEntityFromDb);

        gameMock.gameAnswerQuestion[0].questionAsked = true;

        jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(gameMock);

        const questionCheckDto: QuestionCheckDto = {
            gameId: 1,
            questionAnswerId: 1,
            answer: "успех"
        };

        await expect(gameServiceMock.sendAnswer(questionCheckDto)).rejects.toThrow(
            "This question has already been answered"
        );
    });
});
