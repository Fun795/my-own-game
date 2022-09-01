import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Game } from "./entities/game.entity";
import { Question } from "../question/question.entity";
import { TopicService } from "../topic/topic.service";
import { GameQuestionAnswerService } from "../gameQuestionsAnswer/game-question-answer.service";
import { GameAnswerQuestion } from "../gameQuestionsAnswer/entities/gameAnswerQuestion.entity";
import { QuestionService } from "../question/question.service";
import { NotAcceptableException } from "@nestjs/common/exceptions/not-acceptable.exception";
import { GameStatus } from "./enums/statusGameEnum";
import { GameDto, GameFindAllDto } from "./dto";
import { mapGameToGameDto, mapGameToGameCreateDto, mapGameToGameFindAllDto } from "./mapper/game.mapper";
import { QuestionCheckDto } from "../question/dto";

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

    async create(): Promise<GameDto> {
        const game = this.gameRepository.create();
        const questions = await this.topicService.generateBoard();

        // game.fillQuestions(questions);
        const createdGame = await this.gameRepository.save(game);

        const createdGameDto: GameDto = mapGameToGameCreateDto(createdGame);
        return createdGameDto;
    }

    async findAll(): Promise<GameFindAllDto[]> {
        const games: Game[] = await this.gameRepository.find({ order: { updatedDate: "DESC" } });
        const gameArray: GameFindAllDto[] = mapGameToGameFindAllDto(games);

        return gameArray;
    }

    async findOne(id: number): Promise<Game> {
        const game = await this.gameRepository.findOne({ id });
        if (!game) {
            throw new NotFoundException(`game not found by id ${id}`);
        }

        return game;
    }

    async sendAnswer(questionCheckDto: QuestionCheckDto): Promise<boolean> {
        const game: Game = await this.findOne(questionCheckDto.gameId);
        const resultAnswer = game.giveAnswer(questionCheckDto.questionId, questionCheckDto.answer);
        await this.gameRepository.save(game);

        return resultAnswer;
    }

    async test() {
        return await this.gameRepository.findOne({
            relations: ["gameAnswerQuestion"]
        });
    }
}
