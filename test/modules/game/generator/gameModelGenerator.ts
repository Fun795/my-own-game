import { Game } from "../../../../src/modules/game/entities/game.entity";
import { GameStatus } from "../../../../src/modules/game/enums/statusGameEnum";
import { GameAnswerQuestionModelGenerator } from "./gameAnswerQuestionGenerator";

export class GameModelGenerator extends Game {
    withId(value: number): GameModelGenerator {
        this.id = value;
        return this;
    }
    withGameAnswerQuestion(value: GameAnswerQuestionModelGenerator[]): GameModelGenerator {
        this.gameAnswerQuestion = value;
        return this;
    }
    addOneGameAnswerQuestion(value: GameAnswerQuestionModelGenerator): GameModelGenerator {
        this.gameAnswerQuestion.push(value);
        return this;
    }
    withStep(value: number): GameModelGenerator {
        this.step = value;
        return this;
    }

    withUpdatedDate(): GameModelGenerator {
        this.updatedDate = new Date();
        return this;
    }

    withStatus(value: GameStatus): GameModelGenerator {
        this.status = value;
        return this;
    }

    withTotalScore(value: number): GameModelGenerator {
        this.totalScore = value;
        return this;
    }

    static empty(): GameModelGenerator {
        return new GameModelGenerator();
    }

    static default(): GameModelGenerator {
        return new GameModelGenerator()
            .withId(1)
            .withGameAnswerQuestion([GameAnswerQuestionModelGenerator.default()])
            .withStep(0)
            .withUpdatedDate()
            .withStatus(GameStatus.Process)
            .withTotalScore(0);
    }
}
