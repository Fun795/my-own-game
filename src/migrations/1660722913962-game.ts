import { MigrationInterface, QueryRunner } from "typeorm";

export class game1660722913962 implements MigrationInterface {
    name = "game1660722913962";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "game" ("id" SERIAL NOT NULL, "questions" jsonb, "step" integer NOT NULL DEFAULT '0', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL DEFAULT 'process', "total_score" integer NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "game"`);
    }
}
