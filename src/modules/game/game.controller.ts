import { Controller, Get, Post, Param } from "@nestjs/common";
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

    @Get(":id") findOne(@Param("id") id: number): Promise<Game | undefined> {
        return this.gameService.findOne(id);
    }

    @Get("processingQuestionAnswer/:game_id/:id/:answer") processingQuestionAnswer(
        @Param() parameter: CheckQuestionDto
    ): Promise<CreateGameAnswerQuestionDto> {
        return this.gameService.processingQuestionAnswer(parameter.answer, parameter.id, parameter.game_id);
    }

    //*********************************************************
    // @Get("get/:id")
    // async getById(@Query() questionIdDto: QuestionIdDto): Promise<Question> {
    //     return await this.appService.findOne(questionIdDto.id);
    // }
    // findOne(id: number): Promise<Question> {
    //     return this.questionRepository.findOne({ id });
    // }
    //*************************************************************

    //
    // @Patch(":id")
    // update(@Param("id") id: string, @Body() updateGameDto: UpdateGameDto) {
    //     return this.gameService.update(+id, updateGameDto);
    // }
    //
    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //     return this.gameService.remove(+id);
    // }
}
