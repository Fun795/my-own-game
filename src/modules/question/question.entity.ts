import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
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

    @ManyToMany((type) => Topic, (topic) => topic.questions)
    @JoinTable()
    topics: Topic[];
}
