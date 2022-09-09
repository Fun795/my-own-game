import { Test } from "@nestjs/testing";
import { GameService } from "../../../src/modules/game/game.service";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { GameStatus } from "../../../src/modules/game/enums/statusGameEnum";
import { GameModelGenerator } from "./generator/gameModelGenerator";
import { GameAnswerQuestionModelGenerator } from "./generator/gameAnswerQuestionGenerator";
import { QuestionCheckDtoGenerator } from "./generator/questionCheckDtoGenerator";
import { providers } from "../../game.providers";
import { QuestionModelGenerator } from "./generator/questionModelGenerator";

let gameService: GameService;

describe("Game send answer", () => {
    let app: INestApplication;
    let gameServiceMock: GameService;
    let game: GameModelGenerator;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule(providers).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

        gameServiceMock = await app.resolve(GameService);

        gameService = moduleRef.get<GameService>(GameService);
        game = GameModelGenerator.default();
    });
    describe("Game test throw validation", () => {
        test("If The game you want to answer is already finish", async () => {
            game.withStatus(GameStatus.Finished);
            jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(game);

            const questionCheckDto = QuestionCheckDtoGenerator.default();

            await expect(gameServiceMock.sendAnswer(questionCheckDto)).rejects.toThrow(
                "The game you want to answer is already finish"
            );
        });

        test("If Question is not included in game", async () => {
            jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(game);

            const questionCheckDto = QuestionCheckDtoGenerator.default().withQuestionAnswerId(3);

            await expect(gameServiceMock.sendAnswer(questionCheckDto)).rejects.toThrow(
                "Question is not included in this game"
            );
        });

        test("If this question has already been answered", async () => {
            game.withGameAnswerQuestion([GameAnswerQuestionModelGenerator.default().withQuestionAsked(true)]);
            jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(game);

            const questionCheckDto = QuestionCheckDtoGenerator.default();

            await expect(gameServiceMock.sendAnswer(questionCheckDto)).rejects.toThrow(
                "This question has already been answered"
            );
        });
        test("if validation is ok, the method should return the result of the response", async () => {
            game.withGameAnswerQuestion([
                GameAnswerQuestionModelGenerator.default().withQuestion(
                    QuestionModelGenerator.default().withAnswer("успех")
                )
            ]);

            jest.spyOn(gameServiceMock, "findOne").mockResolvedValue(game);
            const questionCheckDto = QuestionCheckDtoGenerator.default().withAnswer("успех");
            const result = await gameServiceMock.sendAnswer(questionCheckDto);

            expect(result).toBe(true);
        });
    });
});
