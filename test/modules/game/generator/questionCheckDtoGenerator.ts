import { QuestionCheckDto } from "../../../../src/modules/question/dto";

export class QuestionCheckDtoGenerator extends QuestionCheckDto {
    withGameId(value: number): QuestionCheckDtoGenerator {
        this.gameId = value;
        return this;
    }
    withQuestionAnswerId(value: number): QuestionCheckDtoGenerator {
        this.questionAnswerId = value;
        return this;
    }
    withAnswer(value: string): QuestionCheckDtoGenerator {
        this.answer = value;
        return this;
    }

    save() {
        return jest.fn();
    }

    static empty(): QuestionCheckDtoGenerator {
        return new QuestionCheckDtoGenerator();
    }

    static default(): QuestionCheckDtoGenerator {
        return new QuestionCheckDtoGenerator().withGameId(1).withQuestionAnswerId(1).withAnswer("успех");
    }
}
