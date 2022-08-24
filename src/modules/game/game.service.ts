import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Game } from "./entities/game.entity";
import { TopicService } from "../topic/topic.service";
import { GameQuestionAnswerService } from "../gameQuestionsAnswer/game-question-answer.service";
import { CreateGameAnswerQuestionDto } from "../gameQuestionsAnswer/dto/addGameAnswerQuestion.dto";
import { QuestionService } from "../question/question.service";
import { UpdateGameDto } from "./dto/update-game.dto";
import { QuestionDto } from "../question/question.entityDto";
import { NotAcceptableException } from "@nestjs/common/exceptions/not-acceptable.exception";

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

    async create(): Promise<Game> {
        const game = this.gameRepository.create();
        const questions = await this.topicService.generateBoard();

        game.fillQuestions(questions);
        return this.gameRepository.save(game);
    }

    findAll(): Promise<Game[]> {
        return this.gameRepository.find({ select: ["id", "updatedDate"], order: { updatedDate: "DESC" } });
    }

    findOne(id: number): Promise<Game | undefined> {
        return this.gameRepository.findOne({ id });
    }

    async processingQuestionAnswer(
        answer: string,
        question_id: number,
        game_id: number
    ): Promise<CreateGameAnswerQuestionDto> {
        const questionInfo: QuestionDto | undefined = await this.questionService.findOne(question_id);

        if (!questionInfo) {
            throw new NotFoundException("id question does not exist");
        }

        const isRelatedToGame: boolean = await this.checkAnswerInGame(question_id, game_id);

        if (!isRelatedToGame) {
            throw Error("id question is not include to this id game");
        }

        const answerIsRight: boolean = answer === questionInfo.answer.trim().toLowerCase();
        const resultAddQuestionAnswerRow = await this.addQuestionAnswerRow(question_id, game_id, answerIsRight);
        if (!resultAddQuestionAnswerRow) {
            throw Error("Something went wrong with addQuestionAnswerRow function");
        }
        await this.updateGameAfterUserAnswer(question_id, game_id, answerIsRight, questionInfo.point);

        return resultAddQuestionAnswerRow;
    }

    async checkAnswerInGame(question_id: number, game_id: number): Promise<boolean> {
        const gameInfo: Game | undefined = await this.gameRepository.findOne(game_id);
        if (gameInfo.status === "finished") {
            throw new NotAcceptableException(`game to id - ${game_id} was finished!`);
        }

        if (!gameInfo) {
            throw new NotFoundException("game not found by id");
        }

        return gameInfo.questions.includes(question_id);
    }
    async addQuestionAnswerRow(
        question_id: number,
        game_id: number,
        answer: boolean
    ): Promise<CreateGameAnswerQuestionDto> {
        const gameQuestionAnswerServiceDto: CreateGameAnswerQuestionDto = {
            game_id: game_id,
            question_id: question_id,
            is_answered: answer
        };
        return await this.gameQuestionAnswerService.create(gameQuestionAnswerServiceDto);
    }
    async updateGameAfterUserAnswer(
        question_id: number,
        game_id: number,
        answer: boolean,
        updated_point: number
    ): Promise<UpdateGameDto> {
        const gameToUpdate: Game | undefined = await this.gameRepository.findOne({
            id: game_id
        });
        if (!gameToUpdate) {
            throw new NotFoundException("game not found by id");
        }
        gameToUpdate.total_score += answer ? updated_point : 0;
        gameToUpdate.step++;

        if (gameToUpdate.step >= 25) {
            gameToUpdate.status = "finished";
        }

        const updatedGame: UpdateGameDto = await this.gameRepository.save(gameToUpdate);
        return updatedGame;
    }
}
