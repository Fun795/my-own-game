import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TopicService } from "./topic.service";
import { TopicCreateDto, TopicUpdateDto, TopicToQuestionDto } from "./dto";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import { Topic } from "./entities/topic.entity";
import { Question } from "../question/question.entity";

@ApiTags("topic")
@Controller("topic")
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get()
    @ApiOkResponse()
    findAll(): Promise<Topic[]> {
        return this.topicService.findAll();
    }

    @Get(":id")
    @ApiNotFoundResponse({
        description: "Topic not found by number id"
    })
    @ApiOkResponse()
    findOne(@Param("id") id: number) {
        return this.topicService.findOne(id);
    }

    @Post()
    @ApiBadRequestResponse({
        description: "Invalid body params"
    })
    @ApiCreatedResponse({
        description: "Topic created",
        type: Topic
    })
    create(@Query() createTopicDto: TopicCreateDto) {
        return this.topicService.create(createTopicDto);
    }

    @Patch()
    @ApiNotFoundResponse({
        description: "Topic not found by number id"
    })
    @ApiOkResponse({ description: "Success update" })
    update(@Body() updateTopicDto: TopicUpdateDto) {
        return this.topicService.update(updateTopicDto);
    }

    @Delete(":id")
    @ApiOperation({ operationId: "removeQuestion" })
    @ApiNotFoundResponse({
        description: "Topic not found by number id"
    })
    @ApiOkResponse({ description: "Success remove" })
    remove(@Param("id") id: number) {
        return this.topicService.remove(id);
    }

    @Post("findAllManyTopic")
    @ApiOkResponse()
    findAllManyTopic(): Promise<Topic[]> {
        return this.topicService.findRandTopics();
    }
}
