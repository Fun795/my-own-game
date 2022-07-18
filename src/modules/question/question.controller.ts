import { Controller, Get } from "@nestjs/common";
import { AppService } from "./question.service";

@Controller()
export class QuestionController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
