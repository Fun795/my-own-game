import {MigrationInterface, QueryRunner} from "typeorm";

export class questionAnswer1661248989313 implements MigrationInterface {
    name = 'questionAnswer1661248989313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_answer_question" ("game_id" integer NOT NULL, "question_id" integer NOT NULL, "is_answered" boolean NOT NULL, CONSTRAINT "PK_0235457c5b84a5100e6890766f7" PRIMARY KEY ("game_id", "question_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "game_answer_question"`);
    }

}
