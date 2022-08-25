import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreatedGameDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { CheckQuestionDto } from "../question/question.entityDto";
import { Game } from "./entities/game.entity";
import { CreateGameAnswerQuestionDto } from "../gameQuestionsAnswer/dto/addGameAnswerQuestion.dto";

@ApiTags("game")
@Controller("game")
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post()
    async create(): Promise<CreatedGameDto> {
        return this.gameService.create();
    }

    @Get() findAll(): Promise<Game[]> {
        return this.gameService.findAll();
    }

    @Get(":id") findOne(@Param("id") id: number): Promise<Game> {
        return this.gameService.findOne(id);
    }

    @Post("sendAnswer/:game_id/:id/:answer") sendAnswer(@Body() parameter: CheckQuestionDto): Promise<boolean> {
        return this.gameService.sendAnswer(parameter.answer, parameter.id, parameter.game_id);
    }
}
