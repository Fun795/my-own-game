import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { ClientProxyFactory } from "@nestjs/microservices";
import { EventsService } from "../events/events.service";
import { Topic } from "../topic/topic.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Question, Topic])],
    controllers: [QuestionController],
    providers: [QuestionService, EventsService],
    exports: [TypeOrmModule]
})
export class QuestionModule {}
