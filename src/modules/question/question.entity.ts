import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Topic } from "../topic/entities/topic.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    desc: string;

    @Column()
    point: number;

    @ManyToOne(() => Topic, (topic) => topic.questions)
    topic_: Topic;
}
