import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm";
import { GameStatus } from "../enums/statusGameEnum";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("jsonb", { default: [] })
    questions: number[];

    @Column({
        default: 0
    })
    step: number;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({
        default: GameStatus.Process
    })
    status: GameStatus;

    @Column({
        default: 0
    })
    total_score: number;

    fillQuestions(questions: number[]): void {
        this.questions = [...questions];
    }

    checkAnswer(answer: string, userAnswer: string): boolean {
        return answer === userAnswer.trim().toLowerCase();
    }
    updateGameDto(answer: boolean, updated_point: number): Game {
        this.total_score += answer ? updated_point : 0;
        this.step++;

        if (this.step >= 25) {
            this.status = GameStatus.Finished;
        }
        return this;
    }
}
