import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { GameService } from "../../../src/modules/game/game.service";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Game } from "../../../src/modules/game/entities/game.entity";
import { Question } from "../../../src/modules/question/question.entity";
import { CreateGameDto } from "../../../src/modules/game/dto";
import { GameStatus } from "../../../src/modules/game/enums/statusGameEnum";
import { providers } from "../../game.providers";
describe("Game", () => {
    let app: INestApplication;
    let gameServiceMock: GameService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule(providers).compile();
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
});
