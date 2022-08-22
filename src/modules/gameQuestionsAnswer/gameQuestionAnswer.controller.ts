import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { GameQuestionAnswerService } from "./game-question-answer.service";
import { ApiTags } from "@nestjs/swagger";
import { QuestionIdDto } from "../question/question.entityDto";
import { GameAnswerQuestion } from "../gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { CreateGameAnswerQuestionDto } from "./dto/addGameAnswerQuestion.dto";
import { GetGameAnswerQuestionsByGameIdAndQuestionDto } from "./dto/byGameIdAndQuestionId.dto";
@ApiTags("answerQuestions")
@Controller("answerQuestions")
export class gameQuestionAnswerController {
    constructor(private readonly gameAnswerQuestionService: GameQuestionAnswerService) {}

    @Post()
    createAnswer(@Body() createAnswerQuestionDto: CreateGameAnswerQuestionDto) {
        return this.gameAnswerQuestionService.create(createAnswerQuestionDto);
    }

    @Get()
    findAll() {
        return this.gameAnswerQuestionService.findAll();
    }
    @Get("findAllToGameId/:game_Id")
    findAllToGameId(@Param("game_Id") id: number) {
        return this.gameAnswerQuestionService.findAllToGameId(id);
    }
    @Get(":game_id/:question_id")
    findOneToGameIdAndQuestionId(@Param() parameter: GetGameAnswerQuestionsByGameIdAndQuestionDto) {
        return this.gameAnswerQuestionService.findOneToGameIdAndQuestionId(parameter.game_id, parameter.question_id);
    }
}
