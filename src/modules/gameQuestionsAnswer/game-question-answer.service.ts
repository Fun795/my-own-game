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

    async create(createAddAnswerQuestionDto: CreateGameAnswerQuestionDto) {
        // try {
        await this.gameAnswerQuestionRepository.insert(createAddAnswerQuestionDto);
        // } catch (error) {
        //     console.log(error);
        //     // throw new BadGatewayException("gameAnswerQuestion not found by id");
        // }
    }

    findAll() {
        return this.gameAnswerQuestionRepository.find({});
    }

    findAllToGameId(game_id: number) {
        return this.gameAnswerQuestionRepository.find({
            game_id: game_id
        });
    }

    findOneToGameIdAndQuestionId(game_id: number, question_id: number) {
        return this.gameAnswerQuestionRepository.find({
            game_id: game_id,
            question_id: question_id
        });
    }
}
