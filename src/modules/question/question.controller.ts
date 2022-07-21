import { Controller, Get } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";

@Controller()
export class QuestionController {
    constructor(private readonly appService: QuestionService) {}

    @Get()
    async getHello(): Promise<Question[]> {
        return await this.appService.findAll();
    }
}
