import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}