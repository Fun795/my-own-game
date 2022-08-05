import { Body, Controller, Delete, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { Response } from "express";
import { ApiCreatedResponse, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { QuestionDto, QuestionDtoCreate, QuestionDtoId } from "./question.entityDto";
import { EventsService } from "../events/events.service";

@Controller("question")
export class QuestionController {
    constructor(private readonly appService: QuestionService, private eventService: EventsService) {}

    @Post("create")
    @ApiCreatedResponse({ description: "Question created", type: [Question] })
    async create(@Query() params: QuestionDtoCreate, @Res({ passthrough: true }) res: Response): Promise<boolean> {
        res.status(HttpStatus.CREATED);

        return await this.appService.create(params);
    }

    @Delete("delete")
    async delete(@Query() deleteApi: QuestionDtoId, @Res({ passthrough: true }) res: Response): Promise<string> {
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
        const result = await this.appService.findAll();
        await this.eventService.sendChangeEvent("vhost_initialisedasd");

        return result;
    }

    @Get(":id")
    async getById(@Query() questionIdDto: QuestionDtoId): Promise<Question> {
        return await this.appService.findOne(questionIdDto.id);
    }
}
