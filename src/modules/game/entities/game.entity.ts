import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm";
import { GameStatus } from "../enums/statusGameEnum";
import { GameAnswerQuestion } from "../../gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { Question } from "../../question/question.entity";
import { QuestionCheckDto } from "../../question/dto";
import { ResultAnswerDto } from "../../gameQuestionsAnswer/dto/addGameAnswerQuestion.dto";

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

    updateAfterAnswer({ isCorrect, question }: ResultAnswerDto): void {
        this.totalScore += isCorrect ? question.point : 0;
        this.step++;

        if (this.step >= 25) {
            this.status = GameStatus.Finished;
        }
    }
}
