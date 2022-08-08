import { Body, Controller, Delete, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { Response } from "express";
import { ApiCreatedResponse, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { QuestionDto, QuestionCreateDto, QuestionIdDto, QuestionReplaceDto } from "./question.entityDto";
import { EventsService } from "../events/events.service";

@Controller("question")
export class QuestionController {
    constructor(private readonly appService: QuestionService, private eventService: EventsService) {}

    @Post("create")
    @ApiCreatedResponse({ description: "Question created", type: [Question] })
    async create(@Query() params: QuestionCreateDto, @Res({ passthrough: true }) res: Response): Promise<QuestionDto> {
        res.status(HttpStatus.CREATED);
        const result = await this.appService.create(params);
        this.eventService.sendCreateEvent(result);

        return result;
    }

    @Delete("delete")
    async delete(@Query() deleteApi: QuestionIdDto, @Res({ passthrough: true }) res: Response): Promise<string> {
        const status = await this.appService.remove(deleteApi.id);

        if (status) {
            res.status(HttpStatus.OK);
            return "removed";
        }

        res.status(HttpStatus.NO_CONTENT);
        return `noExist row id - ${deleteApi.id}`;
    }

    @Get()
    async getAll(): Promise<Question[]> {
        const result: Question[] = await this.appService.findAll();

        return result;
    }

    @Get(":id")
    async getById(@Query() questionIdDto: QuestionIdDto): Promise<Question> {
        return await this.appService.findOne(questionIdDto.id);
    }

    @Post("/replace/:id")
    async replaceById(@Body() questionReplace: QuestionReplaceDto): Promise<Question> {
        return await this.appService.replace(questionReplace);
    }
}
