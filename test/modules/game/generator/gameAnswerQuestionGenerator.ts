import { Question } from "../../../../src/modules/question/question.entity";
import { GameAnswerQuestion } from "../../../../src/modules/gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { QuestionModelGenerator } from "./questionModelGenerator";

export class GameAnswerQuestionModelGenerator extends GameAnswerQuestion {
    withId(value: number): GameAnswerQuestionModelGenerator {
        this.id = value;
        return this;
    }
    withGameId(value: number): GameAnswerQuestionModelGenerator {
        this.gameId = value;
        return this;
    }
    withQuestion(value: Question): GameAnswerQuestionModelGenerator {
        this.question = value;
        return this;
    }
    withQuestionAsked(value: boolean): GameAnswerQuestionModelGenerator {
        this.questionAsked = value;
        return this;
    }
    withAnswerIsCorrect(value: boolean): GameAnswerQuestionModelGenerator {
        this.answerIsCorrect = value;
        return this;
    }
    withUserAnswer(value: string): GameAnswerQuestionModelGenerator {
        this.userAnswer = value;
        return this;
    }
    save() {
        return jest.fn();
    }

    static empty(): GameAnswerQuestionModelGenerator {
        return new GameAnswerQuestionModelGenerator();
    }

    static default(): GameAnswerQuestionModelGenerator {
        return new GameAnswerQuestionModelGenerator()
            .withId(1)
            .withGameId(1)
            .withQuestion(QuestionModelGenerator.default())
            .withQuestionAsked(false)
            .withAnswerIsCorrect(false)
            .withUserAnswer("");
    }
}
