import {MigrationInterface, QueryRunner} from "typeorm";

export class columnJoinName1661431183379 implements MigrationInterface {
    name = 'columnJoinName1661431183379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_9c94ad4e743815401ff57f89833"`);
        await queryRunner.query(`ALTER TABLE "question" RENAME COLUMN "topicId" TO "topic_id"`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_39d305cac1df890f9724157e2e4" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_39d305cac1df890f9724157e2e4"`);
        await queryRunner.query(`ALTER TABLE "question" RENAME COLUMN "topic_id" TO "topicId"`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_9c94ad4e743815401ff57f89833" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
