import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { EventsService } from "../events/events.service";
import { Topic } from "../topic/entities/topic.entity";
import { TopicModule } from "../topic/topic.module";
import { TopicService } from "../topic/topic.service";

@Module({
    imports: [TypeOrmModule.forFeature([Question, Topic])],
    controllers: [QuestionController],
    providers: [QuestionService, EventsService, TopicService],
    exports: [TypeOrmModule]
})
export class QuestionModule {}
