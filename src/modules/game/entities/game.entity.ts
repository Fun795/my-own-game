import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm";

@Entity()
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("jsonb", { nullable: true })
    questions: number[];

    @Column({
        default: 0
    })
    step: number;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({
        default: "process"
    })
    status: string;

    @Column({
        default: 0
    })
    total_score: number;
}
