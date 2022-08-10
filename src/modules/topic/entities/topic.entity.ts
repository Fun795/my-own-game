import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
// import { Question } from "../question/question.entity";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @OneToMany(() => Question, (question) => question.user)
    // question: Question[];
}
