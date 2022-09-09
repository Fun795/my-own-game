import { Question } from "../../../src/modules/question/question.entity";
import { GameStatus } from "../../../src/modules/game/enums/statusGameEnum";
import { GameModelGenerator } from "./generator/gameModelGenerator";
import { GameAnswerQuestionModelGenerator } from "./generator/gameAnswerQuestionGenerator";
import { QuestionModelGenerator } from "./generator/questionModelGenerator";

describe("Game send answer", () => {
    const rightAnswer = "успех";
    const questionAnswerId = 1;
    let question: Question;
    let game: GameModelGenerator;

    beforeEach(() => {
        question = new QuestionModelGenerator().withAnswer(rightAnswer);
        game = GameModelGenerator.default().withGameAnswerQuestion([
            GameAnswerQuestionModelGenerator.default()
                .withId(questionAnswerId)
                .withQuestion(QuestionModelGenerator.default())
        ]);
    });

    test("updated game if answer is correct", () => {
        const result = game.checkAnswer(questionAnswerId, "успех");

        expect(result).toEqual({ isCorrect: true, rightAnswer: rightAnswer });
        expect(game.status).toEqual(GameStatus.Process);
        expect(game.step).toEqual(1);
        expect(game.totalScore).toEqual(100);
    });

    test("updated game if answer is not correct", () => {
        const result = game.checkAnswer(questionAnswerId, "не успех");

        expect(result).toEqual({ isCorrect: false, rightAnswer: rightAnswer });
        expect(game.status).toEqual(GameStatus.Process);
        expect(game.step).toEqual(1);
        expect(game.totalScore).toEqual(0);
    });

    test("if step game equals 25, game must be finish", () => {
        game.withStep(24);
        game.checkAnswer(1, "финиш");
        expect(game.status).toBe(GameStatus.Finished);
    });
});
