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
import { CreateGameDto, GameDto, GameFindAllDto } from "./dto";
import {
    mapGameToGameDto,
    mapGameToGameFindAllDto,
    mapGameToGameCreateDto,
    mapQuestionToAnswerQuestionDto
} from "./mapper/game.mapper";
import { QuestionCheckDto } from "../question/dto";
import { CreateGameAnswerQuestionDto } from "../gameQuestionsAnswer/dto/addGameAnswerQuestion.dto";

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

    async create(): Promise<CreateGameDto> {
        const game = this.gameRepository.create();
        // const createdGame = await this.gameRepository.save(game);

        const questions = await this.generateBoard();
        // game.setQuestionMatrix(questions);
        const createdGame = await this.gameRepository.save(game);

        const answerQuestion: CreateGameAnswerQuestionDto[] = mapQuestionToAnswerQuestionDto(questions, game.id);
        await this.gameQuestionAnswerService.create(answerQuestion);

        const createdGameDto: CreateGameDto = mapGameToGameCreateDto(createdGame);

        return createdGameDto;
    }

    async findAll(): Promise<GameFindAllDto[]> {
        const games: Game[] = await this.gameRepository.find({ order: { updatedDate: "DESC" } });
        const gameArray: GameFindAllDto[] = mapGameToGameFindAllDto(games);

        return gameArray;
    }

    async findOne(id: number): Promise<Game> {
        const game = await this.gameRepository.findOne(
            { id },
            {
                relations: ["gameAnswerQuestion"]
            }
        );

        if (!game) {
            throw new NotFoundException(`game not found by id ${id}`);
        }

        return game;
    }

    async sendAnswer(questionCheckDto: QuestionCheckDto): Promise<boolean> {
        const game: Game = await this.findOne(questionCheckDto.gameId);

        // TODO: сделать отдельную валидацию на проверку соответствие id игры и вопроса

        const result = game.checkAnswer(questionCheckDto.questionAnswerId, questionCheckDto.answer);
        //TODO: добавить проверку на уже отвеченный вопрос
        await this.gameRepository.save(game, {});

        return result.isCorrect;
    }

    async generateBoard(): Promise<Question[]> {
        const questions = [];

        const randFiveTopic = await this.topicService.findAllManyTopic(5);

        for (const { id } of randFiveTopic) {
            const QR: Question[] = await this.questionService.findRandQuestionByTopic(id);
            questions.push(...QR);
        }

        return questions;
    }

    async test() {
        return await this.gameRepository.findOne({
            relations: ["gameAnswerQuestion"]
        });
    }
}
