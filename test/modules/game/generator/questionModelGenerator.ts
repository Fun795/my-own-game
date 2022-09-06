import { Topic } from "../../../../src/modules/topic/entities/topic.entity";
import { Question } from "../../../../src/modules/question/question.entity";
import { GameAnswerQuestion } from "../../../../src/modules/gameQuestionsAnswer/entities/gameAnswerQuestion.entity";

export class QuestionModelGenerator extends Question {
    withId(value: number): QuestionModelGenerator {
        this.id = value;
        return this;
    }
    withDesc(value: string): QuestionModelGenerator {
        this.desc = value;
        return this;
    }
    withPoint(value: number): QuestionModelGenerator {
        this.point = value;
        return this;
    }
    withAnswer(value: string): QuestionModelGenerator {
        this.answer = value;
        return this;
    }
    withTopic(value: Topic): QuestionModelGenerator {
        value.id = 1;
        this.topic = value;
        return this;
    }
    withGameAnswerQuestion(value: GameAnswerQuestion[]): QuestionModelGenerator {
        this.gameAnswerQuestion = value;
        return this;
    }
    save() {
        return jest.fn();
    }

    static empty(): QuestionModelGenerator {
        return new QuestionModelGenerator();
    }

    static default(): QuestionModelGenerator {
        return new QuestionModelGenerator()
            .withId(1)
            .withDesc("Описание")
            .withAnswer("успех")
            .withPoint(100)
            .withTopic(new Topic())
            .withGameAnswerQuestion([new GameAnswerQuestion()]);
    }
}
