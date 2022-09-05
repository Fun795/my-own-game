import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { GameService } from "../../../src/modules/game/game.service";
import { GameController } from "../../../src/modules/game/game.controller";
import { INestApplication, ValidationPipe } from "@nestjs/common";
//import { mockGameModel as fakeGameModel } from "./mock/GameModelMock";
import { getRepositoryToken } from "@nestjs/typeorm";
import { getLoggerToken, PinoLogger } from "nestjs-pino";
// import { EventsService } from "../../../src/modules/events/events.service";
import { Game } from "../../../src/modules/game/entities/game.entity";
import { repositoryMock } from "../../mock/repository.mock";
import { Topic } from "../../../src/modules/topic/entities/topic.entity";
import { TopicService } from "../../../src/modules/topic/topic.service";
import { Question } from "../../../src/modules/question/question.entity";
import { GameQuestionAnswerService } from "../../../src/modules/gameQuestionsAnswer/game-question-answer.service";
import { QuestionService } from "../../../src/modules/question/question.service";
import { loggerMock } from "../../mock/logger.mock";
import { EventsService } from "../../../src/modules/events/events.service";
import { eventsServiceMock } from "../../mock/eventsService.mock";
// import { eventsServiceMock } from "../../mock/eventsService.mock";
import { GameAnswerQuestion } from "../../../src/modules/gameQuestionsAnswer/entities/gameAnswerQuestion.entity";

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
    test("game create", () => {
        const game = gameServiceMock.create();
        expect(game).toBe(2);
    });

    // test("/POST generateBoard/. Should return 201", () => {
    //     const mockResult = [new Question()];
    //     jest.spyOn(gameServiceMock, "generateBoard").mockResolvedValue(mockResult);
    //
    //     return request(app.getHttpServer())
    //         .post(`/game/generateBoard`)
    //         .send()
    //         .expect((res) => {
    //             expect(res.body).toEqual(mockResult);
    //         })
    //         .expect(201);
    // });
});
