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
}
