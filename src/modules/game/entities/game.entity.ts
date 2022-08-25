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
    status: string;

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
}
