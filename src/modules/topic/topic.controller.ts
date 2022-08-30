import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { TopicCreateDto } from "./dto/topic.create.dto";
import { TopicUpdateDto } from "./dto/topic.update.dto";
import { ApiTags } from "@nestjs/swagger";
import { Topic } from "./entities/topic.entity";
import { TopicToQuestionDto } from "./dto/topic.toQuestion.dto";

@ApiTags("topic")
@Controller("topic")
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get()
    findAll(): Promise<Topic[]> {
        return this.topicService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.topicService.findOne(+id);
    }

    @Post()
    create(@Query() createTopicDto: TopicCreateDto) {
        return this.topicService.create(createTopicDto);
    }

    @Patch()
    update(@Body() updateTopicDto: TopicUpdateDto) {
        return this.topicService.update(updateTopicDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.topicService.remove(+id);
    }

    @Post("findAllManyTopic")
    findAllManyTopic(): Promise<Topic[]> {
        return this.topicService.findAllManyTopic();
    }

    @Post("manyToMany")
    manyToMany(@Query() manyToMany: TopicToQuestionDto) {
        return this.topicService.topicToQuestion(manyToMany);
    }

    @Post("/generateBoard/")
    async generateBoard(): Promise<any> {
        return await this.topicService.generateBoard();
    }
}
