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

describe("QuestionController", () => {
    let questionController: QuestionController;
    let questionService: QuestionService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [QuestionController],
            providers: [QuestionService]
        }).compile();

        questionService = moduleRef.get<QuestionService>(QuestionService);
    });

    describe("findAll", () => {
        it("should return an array of cats", async () => {
            const result = ["test"];
            jest.spyOn(questionService, "findAll").mockImplementation(() => result);

            expect(await questionController.getAll()).toBe(result);
        });
    });
});
