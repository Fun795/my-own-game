import { Body, Controller, Delete, Get, HttpStatus, Patch, Post, Query, Res } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { Response } from "express";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
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

    @Get("get/:id")
    async getById(@Query() questionIdDto: QuestionIdDto): Promise<Question> {
        return await this.appService.findOne(questionIdDto.id);
    }

    @Post("create")
    @ApiCreatedResponse({ description: "Question created", type: [Question] })
    async create(@Body() params: QuestionCreateDto, @Res({ passthrough: true }) res: Response): Promise<QuestionDto> {
        res.status(HttpStatus.CREATED);

        // if (isNumber(Number(params.topic))) {
        //     params.topic =  Number(params.topic) ;
        // }

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

    @Patch("replace/:id")
    async replaceById(@Body() questionReplace: QuestionReplaceDto): Promise<Question> {
        return await this.appService.replace(questionReplace);
    }

    @Get("/findAllManyTopic/")
    async findAllManyTopic(): Promise<Question[]> {
        return await this.appService.findAllManyTopic();
    }
}
