import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { QuestionService } from "../../../src/modules/question/question.service";
import { QuestionController } from "../../../src/modules/question/question.controller";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { getLoggerToken } from "nestjs-pino";
import { EventsService } from "../../../src/modules/events/events.service";
import { Question } from "../../../src/modules/question/question.entity";
import { Topic } from "../../../src/modules/topic/entities/topic.entity";
import { TopicService } from "../../../src/modules/topic/topic.service";
import { repositoryMock } from "../../mock/repository.mock";
import { eventsServiceMock } from "../../mock/eventsService.mock";
import { loggerMock } from "../../mock/logger.mock";

describe("Question", () => {
    let app: INestApplication;
    let TopicServiceMock: TopicService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [QuestionController],
            providers: [
                QuestionService,
                {
                    provide: TopicService,
                    useValue: {
                        topicToQuestion: () => {
                            return { questions: [new Question()] };
                        },
                        findOne: jest.fn()
                    }
                },
                {
                    provide: EventsService,
                    useValue: eventsServiceMock
                },
                {
                    provide: getRepositoryToken(Question),
                    useValue: repositoryMock
                },
                {
                    provide: getRepositoryToken(Topic),
                    useValue: repositoryMock
                },
                {
                    provide: getLoggerToken(QuestionService.name), //provide: "PinoLogger:QuestionService",
                    useValue: loggerMock
                }
            ]
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
        TopicServiceMock = await app.resolve(TopicService);
        await app.init();
    });

    test(`/GET questions`, () => {
        const question = new Question();
        jest.spyOn(repositoryMock, "find").mockResolvedValue(new Question());

        return request(app.getHttpServer())
            .get("/question")
            .expect((res) => {
                expect(res.body).toMatchObject(question);
            });
    });

    test("/DELETE orders/:number. Should return 404 if order was not found", () => {
        jest.spyOn(repositoryMock, "findOne").mockResolvedValue(null);
        return request(app.getHttpServer()).get(`/question/12`).expect(404);
    });

    test("/POST question/. Should return 201 if order not exist and have been created", () => {
        const question: Question = { id: 1, point: 500, answer: "", desc: "", topic: new Topic() };
        const topic: Topic = { id: 1, questions: [question], name: "" };

        jest.spyOn(repositoryMock, "save").mockResolvedValue(question);
        jest.spyOn(TopicServiceMock, "findOne").mockResolvedValue(topic);

        return request(app.getHttpServer())
            .post(`/question`)
            .send({ title: "string", desc: "string", point: 0, topicId: 1, answer: "string" })
            .expect(201)
            .expect((res) => {
                expect(res.body).toMatchObject(question);
            });
    });

    test("/POST question/. Should return 400 if send empty body", () => {
        return request(app.getHttpServer()).post(`/question`).send({}).expect(400);
    });

    test("/POST question/. Should return 400 if send empty body", () => {
        return request(app.getHttpServer()).post(`/question`).send({ title: "title", desc: "test" }).expect(400);
    });

    afterAll(async () => {
        await app.close();
    });
});
