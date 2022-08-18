import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { EventsService } from "../events/events.service";
import { Topic } from "../topic/entities/topic.entity";
import { TopicModule } from "../topic/topic.module";

@Module({
    imports: [TypeOrmModule.forFeature([Question, Topic]), TopicModule],
    controllers: [QuestionController],
    providers: [QuestionService, EventsService],
    exports: [TypeOrmModule]
})
export class QuestionModule {}
