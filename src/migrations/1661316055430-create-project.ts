import {MigrationInterface, QueryRunner} from "typeorm";

export class createProject1661316055430 implements MigrationInterface {
    name = 'createProject1661316055430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "topic" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "desc" character varying NOT NULL, "point" integer NOT NULL, "answer" character varying NOT NULL, "topic_id" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "questions" jsonb NOT NULL DEFAULT '[]', "step" integer NOT NULL DEFAULT '0', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'process', "total_score" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game_answer_question" ("game_id" integer NOT NULL, "question_id" integer NOT NULL, "is_answered" boolean NOT NULL, CONSTRAINT "PK_0235457c5b84a5100e6890766f7" PRIMARY KEY ("game_id", "question_id"))`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_39d305cac1df890f9724157e2e4" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_39d305cac1df890f9724157e2e4"`);
        await queryRunner.query(`DROP TABLE "game_answer_question"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "topic"`);
    }

}
