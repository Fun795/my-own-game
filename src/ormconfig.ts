import Config from "./config";
import { Question } from "./modules/question/question.entity";

export = {
    type: "postgres",
    port: Config.postgresql.port,
    host: Config.postgresql.host,
    username: Config.postgresql.user,
    password: Config.postgresql.password,
    database: Config.postgresql.db,
    synchronize: true,
    logging: true,
    logger: "advanced-console",
    // entities: [path.join(__dirname, "**", "*.tableFields.{ts, js}")],
    // entities: ["dist/**/*.entity{ .ts,.js}"],
    entities: [Question],

    migrationsTableName: "student_migration_table",
    migrations: ["src/migration/*{.ts,.js}"],
    migrationsRun: true,

    autoLoadEntities: true
};
