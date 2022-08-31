import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { QuestionDto, QuestionCreateDto, QuestionIdDto, QuestionUpdateDto } from "./dto";

@ApiTags("question")
@Controller("question")
export class QuestionController {
    constructor(private readonly questionService: QuestionService) {}

    @Get()
    async getAll(): Promise<Question[]> {
        return await this.questionService.findAll();
    }

    @Get(":id")
    async getById(@Param() questionIdDto: QuestionIdDto): Promise<QuestionDto> {
        return await this.questionService.findOne(questionIdDto.id);
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
        description: "Order not found by number"
    })
    async delete(@Param("id") id: number): Promise<string> {
        const status = await this.questionService.remove(id);

        return `row id - ${status}`;
    }

    @Patch("update/:id")
    async updateById(@Body() questionReplace: QuestionUpdateDto): Promise<QuestionDto> {
        return await this.questionService.update(questionReplace);
    }
}
