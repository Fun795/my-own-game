import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import ormconfig from "src/ormconfig";
import { LoggerModule } from "nestjs-pino";
import config from "./config";
import { QuestionModule } from "./modules/question/question.module";
import { EventsModule } from "./modules/events/events.module";
import { TopicModule } from "./modules/topic/topic.module";
import { GameModule } from "./modules/game/game.module";
import { GameQuestionAnswerModule } from "./modules/gameQuestionsAnswer/gameQuestionAnswer.module";
import pino from "pino";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [() => config]
        }),
        TypeOrmModule.forRoot(ormconfig),
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: "pino-pretty",
                    options: {
                        singleLine: true
                    }
                },
                stream: pino.destination({
                    dest: "./my-file.log", // omit for stdout
                    minLength: 4096, // Buffer before writing
                    sync: false // Asynchronous logging
                })
            }
        }),
        EventsModule,
        QuestionModule,
        TopicModule,
        GameModule,
        GameQuestionAnswerModule
    ]
})
export class AppModule {}
