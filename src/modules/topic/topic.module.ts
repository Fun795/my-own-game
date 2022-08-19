import { Module } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { TopicController } from "./topic.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Topic } from "./entities/topic.entity";
import { Question } from "../question/question.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Topic, Question])],
    controllers: [TopicController],
    providers: [TopicService]
})
export class TopicModule {}
