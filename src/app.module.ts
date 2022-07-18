import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Config from "./config";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            port: 5432,
            username: Config.postgresql.user,
            password: Config.postgresql.password,
            database: Config.postgresql.db,
            host: Config.postgresql.restPort,
            synchronize: true
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
