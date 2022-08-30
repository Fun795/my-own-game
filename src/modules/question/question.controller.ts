import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { QuestionDto } from "./dto/question.entity.dto";
import { QuestionCreateDto } from "./dto/question.create.dto";
import { QuestionIdDto } from "./dto/question.id.dto";
import { QuestionUpdateDto } from "./dto/question.update.dto";

@ApiTags("question")
@Controller("question")
export class QuestionController {
    constructor(private readonly appService: QuestionService) {}

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
        return await this.appService.create(params);
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

    @Patch("update/:id")
    async updateById(@Body() questionReplace: QuestionUpdateDto): Promise<QuestionDto> {
        return await this.appService.update(questionReplace);
    }

    @Get("/findAllManyTopic/")
    async findAllManyTopic(): Promise<Question[]> {
        return await this.appService.findAllManyTopic();
    }
}
