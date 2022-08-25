import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { Topic } from "../topic/entities/topic.entity";

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
}
