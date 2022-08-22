import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Game } from "./entities/game.entity";
import { TopicService } from "../topic/topic.service";
import { GameQuestionAnswerService } from "../gameQuestionsAnswer/game-question-answer.service";
import { CreateGameAnswerQuestionDto } from "../gameQuestionsAnswer/dto/addGameAnswerQuestion.dto";
import { QuestionService } from "../question/question.service";
import { QuestionDto } from "../question/question.entityDto";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        private topicService: TopicService,
        private gameQuestionAnswerService: GameQuestionAnswerService,
        private questionService: QuestionService,
        @InjectPinoLogger(GameService.name)
        private readonly logger: PinoLogger
    ) {}

    async create(createGame: CreateGameDto) {
        const questionBoard = await this.topicService.generateBoard();
        createGame.questions = questionBoard;
        await this.gameRepository.save(createGame);
        const gameReturn: Game = await this.gameRepository.findOne({
            order: { id: "DESC" }
        });

        return gameReturn;
    }

    findAll() {
        return this.gameRepository.find({ select: ["id", "updatedDate"], order: { updatedDate: "DESC" } });
    }

    findOne(id: number): Promise<Game> {
        return this.gameRepository.findOne({ id });
    }

    async updateGameAfterUserAnswer(score: number, game_id: number, is_answered: boolean) {
        const gameToUpdate = await this.gameRepository.findOne({
            id: game_id
        });

        gameToUpdate.total_score += is_answered ? score : 0;
        gameToUpdate.step++;

        if (gameToUpdate.step >= 25) {
            gameToUpdate.status = "finished";
        }

        await this.gameRepository.save(gameToUpdate);
    }

    async checkAnswer(answer: string, question_id: number, game_id: number) {
        const gameInfo = await this.gameRepository.findOne(game_id);

        if (gameInfo.questions.includes(question_id)) {
            const questionInfo = await this.questionService.findOne(question_id);

            const gameQuestionAnswerServiceDto: CreateGameAnswerQuestionDto = {
                game_id: game_id,
                question_id: question_id,
                is_answered: questionInfo.answer == answer
            };

            await this.updateGameAfterUserAnswer(questionInfo.point, game_id, gameQuestionAnswerServiceDto.is_answered);

            await this.gameQuestionAnswerService.create(gameQuestionAnswerServiceDto);
            return gameQuestionAnswerServiceDto;
        }
    }
}
