import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToMany } from "typeorm";
import { GameStatus } from "../enums/statusGameEnum";
import { GameAnswerQuestion } from "../../gameQuestionsAnswer/entities/gameAnswerQuestion.entity";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => GameAnswerQuestion, (gameAnswerQuestion) => gameAnswerQuestion.gameId, {
        cascade: ["insert", "update"],
        eager: true
    })
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

    checkAnswer(questionAnswerId: number, answer: string): any {
        const gameAnswerQuestion: GameAnswerQuestion = this.gameAnswerQuestion.find((x) => x.id === questionAnswerId);

        const isCorrect = gameAnswerQuestion.checkAnswer(answer);

        this.totalScore += isCorrect ? gameAnswerQuestion.question.point : 0;
        this.step++;

        if (this.step >= 25) {
            this.status = GameStatus.Finished;
        }

        return {
            isCorrect,
            rightAnswer: gameAnswerQuestion.question.answer
        };
    }
}
