import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreatedGameDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { Game } from "./entities/game.entity";
import { CreateGameAnswerQuestionDto } from "../gameQuestionsAnswer/dto/addGameAnswerQuestion.dto";
import { QuestionCheckDto } from "../question/dto/question.check.dto";

@ApiTags("game")
@Controller("game")
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post()
    create(): Promise<CreatedGameDto> {
        return this.gameService.create();
    }

    @Get() findAll(): Promise<Game[]> {
        return this.gameService.findAll();
    }

    @Get(":id") findOne(@Param("id") id: number): Promise<Game> {
        return this.gameService.findOne(id);
    }

    @Post("sendAnswer/:game_id/:id/:answer") sendAnswer(@Body() parameter: QuestionCheckDto): Promise<boolean> {
        return this.gameService.sendAnswer(parameter.answer, parameter.id, parameter.game_id);
    }
}
