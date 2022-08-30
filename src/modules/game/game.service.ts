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
import { GameDto, GameFindAllDto } from "./dto";
import { mapGameToGameDto, mapGameToGameCreateDto, mapGameToGameFindAllDto } from "./mapper/game.mapper";

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

        game.fillQuestions(questions);
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

    async sendAnswer(answer: string, question_id: number, game_id: number): Promise<boolean> {
        const question: Question | undefined = await this.questionService.findOne(question_id);

        const game: Game = await this.findOne(game_id);

        const isRelatedToGame: boolean = this.checkAnswerInGame(question_id, game);

        if (!isRelatedToGame) {
            throw Error(`id question is not include to game with id ${game.id}`);
        }

        const answerIsRight: boolean = game.checkAnswer(question.answer, answer);

        await this.gameQuestionAnswerService.create({
            game_id: game.id,
            question_id: question.id,
            is_answered: answerIsRight
        });

        await this.updateGameAfterUserAnswer(game, answerIsRight, question.point);

        return answerIsRight;
    }

    checkAnswerInGame(question_id: number, game: Game): boolean {
        if (game.status === GameStatus.Finished) {
            throw new NotAcceptableException(`game to id-${game.id} was finished!`);
        }

        return game.questions.includes(question_id);
    }
    async updateGameAfterUserAnswer(game: Game, answer: boolean, updated_point: number): Promise<Game> {
        const gameDto: Game = game.updateGameDto(answer, updated_point);

        const updatedGame: Game = await this.gameRepository.save(gameDto);
        return updatedGame;
    }
}
