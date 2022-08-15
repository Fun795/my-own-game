import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Topic } from "../../topic/entities/topic.entity";
import { Question } from "../../question/question.entity";
import { QuestionDto } from "../../question/question.entityDto";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("jsonb", { nullable: true })
    questions: number[];

    @Column()
    status: boolean;

    @Column({
        default: 0
    })
    total_score: number;
}
