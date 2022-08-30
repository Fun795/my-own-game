import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { GameQuestionAnswerService } from "./game-question-answer.service";
import { ApiTags } from "@nestjs/swagger";
import { GameAnswerQuestion } from "./entities/gameAnswerQuestion.entity";
import { CreateGameAnswerQuestionDto } from "./dto/addGameAnswerQuestion.dto";
import { GetGameAnswerQuestionsByGameIdAndQuestionDto } from "./dto/byGameIdAndQuestionId.dto";
@ApiTags("answerQuestions")
@Controller("answerQuestions")
export class gameQuestionAnswerController {
    constructor(private readonly gameAnswerQuestionService: GameQuestionAnswerService) {}

    @Post()
    createAnswer(@Body() createAnswerQuestionDto: CreateGameAnswerQuestionDto): Promise<void> {
        return this.gameAnswerQuestionService.create(createAnswerQuestionDto);
    }

    @Get()
    findAll(): Promise<GameAnswerQuestion[]> {
        return this.gameAnswerQuestionService.findAll();
    }
    @Get("findAllByGameId/:game_Id")
    findAllByGameId(@Param("game_Id") id: number): Promise<GameAnswerQuestion[]> {
        return this.gameAnswerQuestionService.findAllByGameId(id);
    }
}
