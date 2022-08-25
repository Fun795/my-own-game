import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { Response } from "express";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { QuestionCreateDto, QuestionDto, QuestionIdDto, QuestionReplaceDto } from "./question.entityDto";
import { EventsService } from "../events/events.service";
import { isNumber } from "class-validator";

@ApiTags("question")
@Controller("question")
export class QuestionController {
    constructor(private readonly appService: QuestionService, private eventService: EventsService) {}

    @Get()
    async getAll(): Promise<Question[]> {
        return await this.appService.findAll();
    }

    @Get(":id")
    async getById(@Param() questionIdDto: QuestionIdDto): Promise<QuestionDto> {
        return await this.appService.findOne(questionIdDto.id);
    }

    @Post("")
    @ApiBadRequestResponse({
        description: "Invalid body params"
    })
    @ApiCreatedResponse({
        description: "Question created",
        type: Question
    })
    async create(@Body() params: QuestionCreateDto): Promise<QuestionDto> {
        // if (isNumber(Number(params.topic))) {
        //     params.topic =  Number(params.topic) ;
        // }

        const result = await this.appService.create(params);

        await this.eventService.sendCreateEvent(result);

        return result;
    }

    @Delete(":id")
    @ApiOperation({ operationId: "removeQuestion" })
    @ApiNotFoundResponse({
        description: "Order not found by number"
    })
    async delete(@Param("id") id: number): Promise<string> {
        const status = await this.appService.remove(id);

        return `row id - ${status}`;
    }

    @Patch("replace/:id")
    async replaceById(@Body() questionReplace: QuestionReplaceDto): Promise<QuestionDto> {
        return await this.appService.update(questionReplace);
    }

    @Get("/findAllManyTopic/")
    async findAllManyTopic(): Promise<Question[]> {
        return await this.appService.findAllManyTopic();
    }
}
