import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { ApiTags } from "@nestjs/swagger";
import { TopicToQuestionDto } from "./dto/topic.dto";
import { Topic } from "./entities/topic.entity";

@ApiTags("topic")
@Controller("topic")
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get()
    findAll() {
        return this.topicService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.topicService.findOne(+id);
    }

    @Post()
    create(@Query() createTopicDto: CreateTopicDto) {
        return this.topicService.create(createTopicDto);
    }

    @Patch()
    update(@Body() updateTopicDto: UpdateTopicDto) {
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
