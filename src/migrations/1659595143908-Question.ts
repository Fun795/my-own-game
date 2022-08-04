import {MigrationInterface, QueryRunner} from "typeorm";

export class Question1659595143908 implements MigrationInterface {
    name = 'Question1659595143908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "desc" character varying NOT NULL, "point" integer NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
