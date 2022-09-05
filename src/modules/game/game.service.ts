import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Game } from "./entities/game.entity";
import { Question } from "../question/question.entity";
import { TopicService } from "../topic/topic.service";
import { GameQuestionAnswerService } from "../gameQuestionsAnswer/game-question-answer.service";
import { QuestionService } from "../question/question.service";
import { NotAcceptableException } from "@nestjs/common/exceptions/not-acceptable.exception";
import { GameStatus } from "./enums/statusGameEnum";
import { CreateGameDto, GameFindAllDto } from "./dto";
import { mapGameToGameCreateDto, mapGameToGameFindAllDto, mapQuestionToAnswerQuestionDto } from "./mapper/game.mapper";
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

    async create(): Promise<CreateGameDto> {
        const game = this.gameRepository.create();
        const questions = await this.generateBoard();

        game.gameAnswerQuestion = mapQuestionToAnswerQuestionDto(questions, game.id);

        return await this.gameRepository.save(game);
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
    validateAnswer(questionCheckDto: QuestionCheckDto, game: Game): void {
        if (game.status === GameStatus.Finished) {
            throw new NotAcceptableException("The game you want to answer is already finish");
        }
        const gameAnswerQuestion = game.gameAnswerQuestion.find((x) => x.id === questionCheckDto.questionAnswerId);

        if (!gameAnswerQuestion) {
            throw new NotAcceptableException("Question is not included in this game");
        }
        const alreadyAnswered = gameAnswerQuestion.questionAsked;

        if (alreadyAnswered) {
            throw new NotAcceptableException("This question has already been answered");
        }
    }
    async sendAnswer(questionCheckDto: QuestionCheckDto): Promise<boolean> {
        const game: Game = await this.findOne(questionCheckDto.gameId);
        this.validateAnswer(questionCheckDto, game);

        const result = game.checkAnswer(questionCheckDto.questionAnswerId, questionCheckDto.answer);
        await this.gameRepository.save(game, {});

        return result.isCorrect;
    }

    async generateBoard(): Promise<Question[]> {
        const questions = [];

        const randFiveTopic = await this.topicService.findRandTopics(5);

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
