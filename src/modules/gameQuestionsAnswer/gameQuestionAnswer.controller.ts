import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { GameQuestionAnswerService } from "./game-question-answer.service";
import { ApiTags } from "@nestjs/swagger";
import { GameAnswerQuestion } from "./entities/gameAnswerQuestion.entity";
@ApiTags("answerQuestions")
@Controller("answerQuestions")
export class gameQuestionAnswerController {
    constructor(private readonly gameAnswerQuestionService: GameQuestionAnswerService) {}

    @Get()
    findAll(): Promise<GameAnswerQuestion[]> {
        return this.gameAnswerQuestionService.findAll();
    }
    @Get("findAllByGameId/:game_Id")
    findAllByGameId(@Param("game_Id") id: number): Promise<GameAnswerQuestion[]> {
        return this.gameAnswerQuestionService.findAllByGameId(id);
    }
}
