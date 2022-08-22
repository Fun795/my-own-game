import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GameAnswerQuestion {
    @Generated()
    id: number;

    @PrimaryColumn()
    game_id: number;

    @PrimaryColumn()
    question_id: number;

    @Column()
    is_answered: boolean;
}
