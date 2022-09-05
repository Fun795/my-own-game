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
import { CreateGameDto } from "../../../src/modules/game/dto";
import { GameStatus } from "../../../src/modules/game/enums/statusGameEnum";
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
    });
    test("/POST game/. method create game should return 201", () => {
        const game: CreateGameDto = { id: 1, status: GameStatus.Process };

        jest.spyOn(gameServiceMock, "create").mockResolvedValue(game);

        return request(app.getHttpServer())
            .post(`/game`)
            .expect(201)
            .expect((res) => {
                expect(res.body).toEqual(game);
            });
    });

    test("/POST generateBoard/. Should return 201", () => {
        const mockResult = [new Question()];
        jest.spyOn(gameServiceMock, "generateBoard").mockResolvedValue(mockResult);

        return request(app.getHttpServer())
            .post(`/game/generateBoard`)
            .send()
            .expect((res) => {
                expect(res.body).toEqual(mockResult);
            })
            .expect(201);
    });

    // test(`/GET questions`, () => {
    //     const question = new Question();
    //     jest.spyOn(repositoryMock, "find").mockResolvedValue(new Question());
    //
    //     return request(app.getHttpServer())
    //         .get("/question")
    //         .expect((res) => {
    //             expect(res.body).toMatchObject(question);
    //         });
    // });
    //
    // test("/DELETE orders/:number. Should return 404 if order was not found", () => {
    //     jest.spyOn(repositoryMock, "findOne").mockResolvedValue(null);
    //     return request(app.getHttpServer()).get(`/question/12`).expect(404);
    // });
    //
    // test("/POST question/. Should return 201 if order not exist and have been created", () => {
    //     const question: Question = { id: 1, point: 500, answer: "", desc: "", topic: new Topic() };
    //     const topic: Topic = { id: 1, questions: [question], name: "" };
    //     jest.spyOn(repositoryMock, "save").mockResolvedValue(question);
    //     jest.spyOn(repositoryMock, "findOne").mockResolvedValue(topic);
    //
    //     return request(app.getHttpServer())
    //         .post(`/question`)
    //         .send({ title: "string", desc: "string", point: 0, topicId: 1, answer: "string" })
    //         .expect(201)
    //         .expect((res) => {
    //             expect(res.body).toMatchObject(question);
    //         });
    // });
    //
    // test("/POST question/. Should return 400 if send empty body", () => {
    //     return request(app.getHttpServer()).post(`/question`).send({}).expect(400);
    // });
    //
    // test("/POST question/. Should return 400 if send empty body", () => {
    //     return request(app.getHttpServer()).post(`/question`).send({ title: "title", desc: "test" }).expect(400);
    // });
    //
    // afterAll(async () => {
    //     await app.close();
    // });
});
