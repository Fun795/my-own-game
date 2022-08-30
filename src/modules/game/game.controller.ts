import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { GameService } from "./game.service";
import { GameDto, GameFindAllDto } from "./dto";
import { ApiTags } from "@nestjs/swagger";
import { QuestionCheckDto } from "../question/dto";
import { mapGameToGameDto } from "./mapper/game.mapper";

@ApiTags("game")
@Controller("game")
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post()
    create(): Promise<GameDto> {
        return this.gameService.create();
    }

    @Get()
    async findAll(): Promise<GameFindAllDto[]> {
        return await this.gameService.findAll();
    }

    @Get(":id") async findOne(@Param("id") id: number): Promise<GameDto> {
        const game = await this.gameService.findOne(id);
        return mapGameToGameDto(game);
    }

    @Post("sendAnswer/:game_id/:id/:answer") sendAnswer(@Body() parameter: QuestionCheckDto): Promise<boolean> {
        return this.gameService.sendAnswer(parameter.answer, parameter.id, parameter.game_id);
    }
}
