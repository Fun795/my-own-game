import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { GameStatus } from "../enums/statusGameEnum";
import { GameAnswerQuestion } from "../../gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { Question } from "../../question/question.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => GameAnswerQuestion, (gameAnswerQuestion) => gameAnswerQuestion.gameId)
    gameAnswerQuestion: GameAnswerQuestion[];

    @Column({
        default: 0
    })
    step: number;

    @UpdateDateColumn({ name: "updatedDate" })
    updatedDate: Date;

    @Column({
        default: GameStatus.Process
    })
    status: GameStatus;

    @Column({
        name: "total_score",
        default: 0
    })
    totalScore: number;

    fillQuestions(questions: GameAnswerQuestion[]): void {
        // this.questions = [...questions];
    }

    giveAnswer(questionId: number, userAnswer: string): boolean {
        // TODO Как обновить questionAnswer правильно?
        const question: GameAnswerQuestion = this.gameAnswerQuestion.find(
            (gameAnswerQuestion) => gameAnswerQuestion.question.id === questionId
        );
        question.questionAsked = true;

        const isCorrect = question.question.answer === userAnswer;
        question.answerIsCorrect = isCorrect;

        if (isCorrect) {
            this.totalScore += question.question.point;
        }

        question.userAnswer = userAnswer;

        this.step++;
        if (this.step >= 25) {
            this.status = GameStatus.Finished;
        }
        return isCorrect;
    }
}
