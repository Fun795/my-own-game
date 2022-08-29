import { Injectable } from "@nestjs/common";
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
        await this.gameAnswerQuestionRepository.insert(createAddAnswerQuestionDto);
    }

    async findAll(): Promise<GameAnswerQuestion[]> {
        return await this.gameAnswerQuestionRepository.find({});
    }

    findAllToGameId(game_id: number): Promise<GameAnswerQuestion[]> {
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
