import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import {
    ApiAcceptedResponse,
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from "@nestjs/swagger";
import { QuestionDto, QuestionCreateDto, QuestionIdDto, QuestionUpdateDto } from "./dto";

@ApiTags("question")
@Controller("question")
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Get()
    @ApiOkResponse({})
    async getAll(): Promise<Question[]> {
        return await this.questionService.findAll();
    }

    @Get(":id")
    @ApiNotFoundResponse({
        description: "Question not found by number id"
    })
    @ApiOkResponse()
    async getById(@Param("id") id: number): Promise<QuestionDto> {
        return await this.questionService.findOne(id);
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
        return await this.questionService.create(params);
    }

    @Delete(":id")
    @ApiOperation({ operationId: "removeQuestion" })
    @ApiNotFoundResponse({
        description: "Question not found by number id"
    })
    @ApiOkResponse({ description: "Success remove" })
    async delete(@Param("id") id: number): Promise<string> {
        const status = await this.questionService.remove(id);

        return `row id - ${status}`;
    }

    @Patch("update/:id")
    @ApiNotFoundResponse({
        description: "Question not found by number id"
    })
    @ApiOkResponse({ description: "Success update" })
    async updateById(@Body() questionReplace: QuestionUpdateDto): Promise<QuestionDto> {
        return await this.questionService.update(questionReplace);
    }
}
