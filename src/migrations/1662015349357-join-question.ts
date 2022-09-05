import { MigrationInterface, QueryRunner } from "typeorm";

export class joinQuestion1662015349357 implements MigrationInterface {
    name = "joinQuestion1662015349357";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "game" ("id" SERIAL NOT NULL, "step" integer NOT NULL DEFAULT '0', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'process', "total_score" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "game_answer_question" ("id" SERIAL NOT NULL, "question_asked" boolean NOT NULL DEFAULT false, "answer_is_correct" boolean NOT NULL DEFAULT false, "user_answer" character varying, "game_id" integer, "question_id" integer, CONSTRAINT "PK_e758846591125cecd9fe5ee26de" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_0235457c5b84a5100e6890766f" ON "game_answer_question" ("game_id", "question_id") `
        );
        await queryRunner.query(
            `ALTER TABLE "game_answer_question" ADD CONSTRAINT "FK_18d5590a0f32fdbba344d509e95" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "game_answer_question" ADD CONSTRAINT "FK_d9a8e7c26384695f7399a972ad3" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game_answer_question" DROP CONSTRAINT "FK_d9a8e7c26384695f7399a972ad3"`);
        await queryRunner.query(`ALTER TABLE "game_answer_question" DROP CONSTRAINT "FK_18d5590a0f32fdbba344d509e95"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0235457c5b84a5100e6890766f"`);
        await queryRunner.query(`DROP TABLE "game_answer_question"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }
}
