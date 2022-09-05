import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
    JoinColumn,
    OneToMany
} from "typeorm";
import { Topic } from "../topic/entities/topic.entity";
import { GameAnswerQuestion } from "../gameQuestionsAnswer/entities/gameAnswerQuestion.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    desc: string;

    @Column()
    point: number;

    @Column()
    answer: string;

    @ManyToOne(() => Topic, (topic) => topic.questions)
    @JoinColumn({ name: "topic_id" })
    topic: Topic;

    @OneToMany(() => GameAnswerQuestion, (gameAnswerQuestion) => gameAnswerQuestion.question)
    gameAnswerQuestion: GameAnswerQuestion[];
}
