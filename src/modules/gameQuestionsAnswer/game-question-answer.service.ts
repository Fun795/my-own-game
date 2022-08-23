import { BadGatewayException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateGameAnswerQuestionDto } from "./dto/addGameAnswerQuestion.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { GameAnswerQuestion } from "./entities/gameAnswerQuestion.entity";
// import { TopicService } from "../gameQuestionsAnswer/";

@Injectable()
export class GameQuestionAnswerService {
    constructor(
        @InjectRepository(GameAnswerQuestion)
        private gameAnswerQuestionRepository: Repository<GameAnswerQuestion>,
        @InjectPinoLogger(GameQuestionAnswerService.name)
        private readonly logger: PinoLogger // // private topicService: TopicService
    ) {}

    async create(createAddAnswerQuestionDto: CreateGameAnswerQuestionDto): Promise<CreateGameAnswerQuestionDto> {
        // try {

        const resultInsert = await this.gameAnswerQuestionRepository.insert(createAddAnswerQuestionDto);
        if (!resultInsert) {
            throw new NotFoundException("AnswerQuestion create to db command failed");
        }
        const answerInserted = this.findOneToGameIdAndQuestionId(
            createAddAnswerQuestionDto.game_id,
            createAddAnswerQuestionDto.question_id
        );
        return answerInserted;
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
