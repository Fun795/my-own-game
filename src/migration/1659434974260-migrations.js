// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class migrations1659434974260 {
    async up(queryRunner) {
        await queryRunner.createDatabase(`mog`, true);
    }

    async down(queryRunner) {}
};
