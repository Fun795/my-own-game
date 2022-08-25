import {MigrationInterface, QueryRunner} from "typeorm";

export class renameColumnManyToOne1661408229917 implements MigrationInterface {
    name = 'renameColumnManyToOne1661408229917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" RENAME COLUMN "topic_id" TO "topicId"`);
        await queryRunner.query(`ALTER TABLE "question" RENAME CONSTRAINT "FK_9c94ad4e743815401ff57f89833" TO "FK_9c94ad4e743815401ff57f89833"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" RENAME CONSTRAINT "FK_9c94ad4e743815401ff57f89833" TO "FK_9c94ad4e743815401ff57f89833"`);
        await queryRunner.query(`ALTER TABLE "question" RENAME COLUMN "topicId" TO "topic_id"`);
    }

}
