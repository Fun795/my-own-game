import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../../question/question.entity";
import { Game } from "../../game/entities/game.entity";

@Entity()
@Index(["gameId", "question"], { unique: true })
export class GameAnswerQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Game, (game) => game.gameAnswerQuestion)
    @JoinColumn({ name: "game_id" })
    gameId: number;

    @ManyToOne(() => Question, (question) => question.gameAnswerQuestion, { eager: true })
    @JoinColumn({ name: "question_id" })
    question: Question;

    @Column({
        name: "question_asked",
        default: false
    })
    questionAsked: boolean;

    @Column({
        name: "answer_is_correct",
        default: false
    })
    answerIsCorrect: boolean;

    @Column({
        name: "user_answer",
        nullable: true
    })
    userAnswer: string;

    checkAnswer(answer: string): boolean {
        const isCorrect = this.question.answer === answer;
        this.questionAsked = true;
        this.answerIsCorrect = isCorrect;
        this.userAnswer = answer;
        return isCorrect;
    }
}
