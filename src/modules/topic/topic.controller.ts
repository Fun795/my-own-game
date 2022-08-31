import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { TopicReateDto, TopicUpdateDto, TopicToQuestionDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { Topic } from "./entities/topic.entity";

@ApiTags("topic")
@Controller("topic")
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get()
    findAll(): Promise<Topic[]> {
        return this.topicService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.topicService.findOne(id);
    }

    @Post()
    create(@Query() createTopicDto: TopicReateDto) {
        return this.topicService.create(createTopicDto);
    }

    @Patch()
    update(@Body() updateTopicDto: TopicUpdateDto) {
        return this.topicService.update(updateTopicDto);
    }

    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.topicService.remove(id);
    }

    @Post("findAllManyTopic")
    findAllManyTopic(): Promise<Topic[]> {
        return this.topicService.findAllManyTopic();
    }
}
