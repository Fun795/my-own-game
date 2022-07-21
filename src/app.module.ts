import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import Config from "./config";
import * as path from "path";
import { Question } from "src/modules/question/question.entity";
// import { QuestionController } from "./modules/question/question.controller";
import { QuestionModule } from "./modules/question/question.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "postgres",
            port: Config.postgresql.port,
            host: Config.postgresql.host,
            username: Config.postgresql.user,
            password: Config.postgresql.password,
            database: Config.postgresql.db,
            synchronize: true,
            // logging: true,
            // logger: "advanced-console",
            // entities: [path.join(__dirname, "**", "*.tableFields.{ts, js}")]
            entities: [Question],
            autoLoadEntities: true
        }),
        QuestionModule
    ]
    // controllers: [AppController],
    // providers: [AppService]
})
export class AppModule {}
