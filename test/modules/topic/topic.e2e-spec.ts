import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { QuestionService } from "../../../src/modules/question/question.service";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { getLoggerToken, PinoLogger } from "nestjs-pino";
import { EventsService } from "../../../src/modules/events/events.service";
import { Question } from "../../../src/modules/question/question.entity";
import { Topic } from "../../../src/modules/topic/entities/topic.entity";
import { TopicService } from "../../../src/modules/topic/topic.service";
import { repositoryMock } from "../../mock/repository.mock";
import { eventsServiceMock } from "../../mock/eventsService.mock";
import { TopicController } from "../../../src/modules/topic/topic.controller";
import { TopicCreateDto } from "../../../src/modules/topic/dto/topic.create.dto";
import { TopicUpdateDto } from "../../../src/modules/topic/dto/topic.update.dto";
import { loggerMock } from "../../mock/logger.mock";

describe("Topic", () => {
    let app: INestApplication;
    let TopicServiceMock: TopicService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [TopicController],
            providers: [
                TopicService,
                QuestionService,
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
                    provide: getLoggerToken(TopicService.name), //provide: "PinoLogger:QuestionService",
                    useValue: loggerMock
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

    test(`/GET topic`, () => {
        const topic = new Topic();
        jest.spyOn(repositoryMock, "find").mockResolvedValue(new Topic());

        return request(app.getHttpServer())
            .get("/topic")
            .expect((res) => {
                expect(res.body).toMatchObject(topic);
            });
    });

    test("/DELETE topic/:number. Should return 404 if order was not found", () => {
        jest.spyOn(repositoryMock, "findOne").mockResolvedValue(null);
        return request(app.getHttpServer()).get(`/topic/5`).expect(404);
    });

    test("/POST topic/. Should return 201 if order not exist and have been created", () => {
        const topic: Topic = new Topic();
        const topicSend: TopicCreateDto = { name: "asd" };
        jest.spyOn(repositoryMock, "findOne").mockResolvedValue(topic);

        return (
            request(app.getHttpServer())
                .post(`/topic`)
                .query(topicSend)
                // .send(topicSend) // for Body on post
                .expect(201)
                .expect((res) => {
                    expect(res.body).toMatchObject(topic);
                })
        );
    });

    test("/POST question/. Should return 400 if send empty body", () => request(app.getHttpServer()).post(`/topic`).send({}).expect(400));

    test("/POST question/. Should return 400 if send empty body", () => request(app.getHttpServer()).post(`/topic`).send({ title: "title", desc: "test" }).expect(400));

    test("/PATCH question/. Should return 200", () => {
        const updateTopicDto: TopicUpdateDto = { id: 1, name: "test" };
        jest.spyOn(repositoryMock, "save").mockResolvedValue(updateTopicDto);

        return request(app.getHttpServer())
            .patch(`/topic`)
            .send(updateTopicDto)
            .expect((res) => {
                expect(res.body).toMatchObject(updateTopicDto);
            })
            .expect(200);
    });

    test("/DELETE question/. Should return 200", () => {
        jest.spyOn(repositoryMock, "delete").mockResolvedValue({
            raw: [],
            affected: 1
        });

        return request(app.getHttpServer()).delete(`/topic/11`).expect(200);
    });

    test("/DELETE question/. Should return 404", () => {
        jest.spyOn(repositoryMock, "delete").mockResolvedValue({
            raw: [],
            affected: 0
        });

        return request(app.getHttpServer()).delete(`/topic/11`).expect(404);
    });

    test("/POST generateBoard/. Should return 201", () => {
        const mockResult = [1, 2, 3];
        jest.spyOn(TopicServiceMock, "generateBoard").mockResolvedValue(mockResult);

        return request(app.getHttpServer())
            .post(`/topic/generateBoard`)
            .send()
            .expect((res) => {
                expect(res.body).toEqual(mockResult);
            })
            .expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});
