import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { GameService } from "./game.service";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { ApiTags } from "@nestjs/swagger";
import { CheckQuestionDto, QuestionCreateDto, QuestionDto, QuestionIdDto } from "../question/question.entityDto";
import { Question } from "../question/question.entity";
import { GetGameAnswerQuestionsByGameIdAndQuestionDto } from "../gameQuestionsAnswer/dto/byGameIdAndQuestionId.dto";

@ApiTags("game")
@Controller("game")
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post()
    create(@Body() createGameDto: CreateGameDto) {
        return this.gameService.create(createGameDto);
    }

    @Get()
    findAll() {
        return this.gameService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.gameService.findOne(id);
    }

    @Get("checkAnswer/:game_id/:id/:answer")
    checkAnswer(@Param() parameter: CheckQuestionDto) {
        return this.gameService.checkAnswer(parameter.answer, parameter.id, parameter.game_id);
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
