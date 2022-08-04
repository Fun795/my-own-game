import Config from "./config";
import { ConnectionOptions } from "typeorm";

const ormconfig: ConnectionOptions = {
    type: "postgres",
    port: Config.postgresql.port,
    host: Config.postgresql.host,
    username: Config.postgresql.user,
    password: Config.postgresql.password,
    database: Config.postgresql.db,
    // migrations: [__dirname + "/src/migrations/*{.ts,.js}"],
    // entities: [__dirname + "/src/**/*.entity.{ts,js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    entities: ["dist/**/*.entity.{ts,js}"],
    cli: {
        migrationsDir: "src/migrations"
    }
    // synchronize: true
    // logging: true,
    // logger: "advanced-console",
    //     migrationsRun: true,
    //     autoLoadEntities: true,
};

export default ormconfig;
