import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGameAnswerQuestionDto, ResultAnswerDto } from "./dto/addGameAnswerQuestion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { GameAnswerQuestion } from "./entities/gameAnswerQuestion.entity";
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception";
import { NotAcceptableException } from "@nestjs/common/exceptions/not-acceptable.exception";
import { QuestionCheckDto } from "../question/dto";
import { Question } from "../question/question.entity";

@Injectable()
export class GameQuestionAnswerService {
    constructor(
        @InjectRepository(GameAnswerQuestion)
        private gameAnswerQuestionRepository: Repository<GameAnswerQuestion>,
        @InjectPinoLogger(GameQuestionAnswerService.name)
        private readonly logger: PinoLogger
    ) {}

    async create(createAddAnswerQuestionDto: CreateGameAnswerQuestionDto[]): Promise<void> {
        await this.gameAnswerQuestionRepository.save(createAddAnswerQuestionDto);
    }

    save(object: GameAnswerQuestion): Promise<GameAnswerQuestion> {
        return this.gameAnswerQuestionRepository.save(object);
    }

    async findAll(): Promise<GameAnswerQuestion[]> {
        return await this.gameAnswerQuestionRepository.find({});
    }

    findAllByGameId(gameId: number): Promise<GameAnswerQuestion[]> {
        return this.gameAnswerQuestionRepository.find({ relations: ["question"] });
    }

    findQuestionsByGameId(gameId: number): Promise<GameAnswerQuestion[]> {
        return this.gameAnswerQuestionRepository.find({ where: { gameId: gameId }, relations: ["question"] });
    }
    async giveAnswer(questionCheckDto: QuestionCheckDto): Promise<ResultAnswerDto> {
        const questions = await this.findQuestionsByGameId(questionCheckDto.gameId);
        const gameAnswerQuestion: GameAnswerQuestion = questions.find(
            (gameAnswerQuestion) => gameAnswerQuestion.id === questionCheckDto.questionAnswerId
        );

        if (!gameAnswerQuestion) {
            throw new NotAcceptableException(`the question is not include in this game`);
        }
        if (gameAnswerQuestion.questionAsked) {
            throw new NotAcceptableException(`the question has already been answered in this game`);
        }

        const isCorrect = gameAnswerQuestion.question.answer === questionCheckDto.answer;
        gameAnswerQuestion.questionAsked = true;
        gameAnswerQuestion.answerIsCorrect = isCorrect;
        gameAnswerQuestion.userAnswer = questionCheckDto.answer;
        await this.gameAnswerQuestionRepository.save(gameAnswerQuestion);

        return {
            isCorrect,
            question: gameAnswerQuestion.question
        };
    }
    // async checkAnswerToGameIdAndQuestionId(game_id: number, question_id: number): Promise<void> {
    //     const answer = await this.gameAnswerQuestionRepository.findOne({
    //         game_id,
    //         question_id
    //     });
    //     if (answer) {
    //         throw new BadRequestException(
    //             `In this game, the answer to the question with id ${game_id} has already been given`
    //         );
    //     }
    // }
}
