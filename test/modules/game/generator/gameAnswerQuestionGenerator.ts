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

    static empty(): GameAnswerQuestionModelGenerator {
        return new GameAnswerQuestionModelGenerator();
    }

    static defaultArrayAnswer(amount: number): GameAnswerQuestionModelGenerator[] {
        const arrayAnswers = [];
        for (let count = 0; count < amount; count++) {
            const gameAnswerQuestionModel = new GameAnswerQuestionModelGenerator()
                .withId(count + 1)
                .withGameId(1)
                .withQuestion(QuestionModelGenerator.default())
                .withQuestionAsked(false)
                .withAnswerIsCorrect(false)
                .withUserAnswer("");
            arrayAnswers.push(gameAnswerQuestionModel);
        }
        return arrayAnswers;
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
