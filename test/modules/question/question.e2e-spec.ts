import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { QuestionModule } from "../../../src/modules/question/question.module";
import { QuestionService } from "../../../src/modules/question/question.service";
import { QuestionController } from "../../../src/modules/question/question.controller";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PinoLogger } from "nestjs-pino";
import { EventsService } from "../../../src/modules/events/events.service";
import { Question } from "../../../src/modules/question/question.entity";
import { Topic } from "../../../src/modules/topic/entities/topic.entity";

const repositoryMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    softRemove: jest.fn(),
    save: jest.fn(),
    merge: jest.fn(),
    update: jest.fn(),
    create: jest.fn()
};

describe("Question", () => {
    let app: INestApplication;
    let catsService = { findAll: () => ["test"] };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [QuestionController],
            providers: [
                QuestionService,
                {
                    provide: EventsService,
                    useValue: { sendCreateEvent: jest.fn() } //TODO вынести
                },
                {
                    provide: getRepositoryToken(Question),
                    useValue: repositoryMock //TODO вынести
                },
                {
                    provide: getRepositoryToken(Topic),
                    useValue: repositoryMock //TODO вынести
                },
                {
                    provide: "PinoLogger:QuestionService", //TODO разобраться
                    useValue: {
                        error: jest.fn(),
                        info: jest.fn(),
                        debug: jest.fn()
                    }
                }
            ]
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

        await app.init();
    });

    test(`/GET questions`, () => {
        const question = new Question();
        jest.spyOn(repositoryMock, "find").mockResolvedValue(new Question());

        return request(app.getHttpServer())
            .get("/question")
            .expect(200)
            .expect((res) => {
                expect(res.body).toMatchObject(question);
            });
    });

    test("/DELETE orders/:number. Should return 404 if order was not found", () => {
        jest.spyOn(repositoryMock, "findOne").mockResolvedValue(null);
        return request(app.getHttpServer()).get(`/question/12`).expect(404);
    });

    test("/POST question/. Should return 201 if order not exist and have been created", () => {
        const question: Question = { id: 1, title: "", point: 500, answer: "", desc: "", topic_: new Topic() };
        jest.spyOn(repositoryMock, "save").mockResolvedValue(question);
        return request(app.getHttpServer())
            .post(`/question`)
            .send({ title: "", point: 500, answer: "", desc: "", topic_: new Topic() })
            .expect(201)
            .expect((res) => {
                expect(res.body).toMatchObject(question);
            });
    });

    test("/POST question/. Should return 400 if send empty body", () => {
        return request(app.getHttpServer()).post(`/question`).send({}).expect(400);
    });

    afterAll(async () => {
        await app.close();
    });
});
