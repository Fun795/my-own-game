import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { ApiTags } from "@nestjs/swagger";

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
}
