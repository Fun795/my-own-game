import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGameAnswerQuestionDto } from "./dto/addGameAnswerQuestion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { GameAnswerQuestion } from "./entities/gameAnswerQuestion.entity";

@Injectable()
export class GameQuestionAnswerService {
    constructor(
        @InjectRepository(GameAnswerQuestion)
        private gameAnswerQuestionRepository: Repository<GameAnswerQuestion>,
        @InjectPinoLogger(GameQuestionAnswerService.name)
        private readonly logger: PinoLogger
    ) {}

    async create(createAddAnswerQuestionDto: CreateGameAnswerQuestionDto): Promise<void> {
        const answer = await this.findOneToGameIdAndQuestionId(
            createAddAnswerQuestionDto.game_id,
            createAddAnswerQuestionDto.question_id
        );
        if (answer) {
            throw new NotFoundException(
                `In this game, the answer to the question with id ${createAddAnswerQuestionDto.question_id} has already been given`
            );
        }
        await this.gameAnswerQuestionRepository.insert(createAddAnswerQuestionDto);
    }

    async findAll(): Promise<GameAnswerQuestion[]> {
        return await this.gameAnswerQuestionRepository.find({});
    }

    findAllByGameId(game_id: number): Promise<GameAnswerQuestion[]> {
        return this.gameAnswerQuestionRepository.find({
            game_id: game_id
        });
    }

    findOneToGameIdAndQuestionId(game_id: number, question_id: number): Promise<GameAnswerQuestion> {
        return this.gameAnswerQuestionRepository.findOne({
            game_id: game_id,
            question_id: question_id
        });
    }
}
