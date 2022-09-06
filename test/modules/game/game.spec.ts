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
import { GameModelGenerator } from "./generator/gameModelGenerator";
import { GameAnswerQuestionModelGenerator } from "./generator/gameAnswerQuestionGenerator";
import { QuestionCheckDtoGenerator } from "./generator/questionCheckDtoGenerator";

let gameService: GameService;

describe("Game send answer", () => {
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
        const game = GameModelGenerator.default();
        const result = GameModelGenerator.default()
            .withStep(1)
            .withTotalScore(100)
            .withGameAnswerQuestion(
                GameAnswerQuestionModelGenerator.default()
                    .withAnswerIsCorrect(true)
                    .withQuestionAsked(true)
                    .withUserAnswer("успех")
            );
        game.checkAnswer(1, "успех");
        expect(game).toEqual(result);
    });

    test("updated game if answer is not correct", () => {
        const game = GameModelGenerator.default();
        const result = GameModelGenerator.default()
            .withStep(1)
            .withGameAnswerQuestion(
                GameAnswerQuestionModelGenerator.default().withQuestionAsked(true).withUserAnswer("не успех")
            );
        game.checkAnswer(1, "не успех");
        expect(game).toEqual(result);
    });

    test("if step game equals 25, game must be finish", () => {
        const game = GameModelGenerator.default().withStep(24);
        game.checkAnswer(1, "финиш");
        expect(game.status).toBe(GameStatus.Finished);
    });

    describe("Game test throw validation", () => {
        test("If The game you want to answer is already finish", async () => {
            const game = GameModelGenerator.default().withStatus(GameStatus.Finished);
            jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(game);

            const questionCheckDto = QuestionCheckDtoGenerator.default();

            await expect(gameServiceMock.sendAnswer(questionCheckDto)).rejects.toThrow(
                "The game you want to answer is already finish"
            );
        });

        test("If Question is not included in game", async () => {
            const game = GameModelGenerator.default();
            jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(game);

            const questionCheckDto = QuestionCheckDtoGenerator.default().withQuestionAnswerId(3);

            await expect(gameServiceMock.sendAnswer(questionCheckDto)).rejects.toThrow(
                "Question is not included in this game"
            );
        });

        test("If this question has already been answered", async () => {
            const game = GameModelGenerator.default().withGameAnswerQuestion(
                GameAnswerQuestionModelGenerator.default().withQuestionAsked(true)
            );

            jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(game);

            const questionCheckDto = QuestionCheckDtoGenerator.default();

            await expect(gameServiceMock.sendAnswer(questionCheckDto)).rejects.toThrow(
                "This question has already been answered"
            );
        });
    });
});
