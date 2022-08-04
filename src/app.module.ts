import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
// import { AppController } from "./app.controller";
// import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionModule } from "./modules/question/question.module";
import ormconfig from "src/ormconfig";
import { LoggerModule } from "nestjs-pino";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";

@Module({
    imports: [
        TypeOrmModule.forRoot(ormconfig),
        QuestionModule,
        LoggerModule.forRoot({
            pinoHttp: {
                transport: {
                    target: "pino-pretty",
                    options: {
                        singleLine: true
                    }
                }
            }
        })
    ]
    // controllers: [AppController],
    // providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("question");
    }
}
