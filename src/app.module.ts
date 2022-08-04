import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
// import { AppController } from "./app.controller";
// import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionModule } from "./modules/question/question.module";
import ormconfig from "src/ormconfig";
import { LoggerModule } from "nestjs-pino";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import config from "./config";

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
                }
            }
        }),
        QuestionModule
    ]
    // controllers: [AppController],
    // providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("question");
    }
}
