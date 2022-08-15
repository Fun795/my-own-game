import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Game } from "./entities/game.entity";
import { QuestionDto } from "../question/question.entityDto";

@Injectable()
export class GameService {
    constructor(
        @InjectRepository(Game)
        private gameRepository: Repository<Game>,
        @InjectPinoLogger(GameService.name)
        private readonly logger: PinoLogger
    ) {}

    async create(createGameDto: CreateGameDto) {
        await this.gameRepository.save(createGameDto);
        const gameReturn: Game = await this.gameRepository.findOne({
            order: { id: "DESC" }
        });

        return gameReturn;
    }

    findAll() {
        return this.gameRepository.find();
    }
    //
    // findOne(id: number) {
    //   return `This action returns a #${id} game`;
    // }
    //
    // update(id: number, updateGameDto: UpdateGameDto) {
    //   return `This action updates a #${id} game`;
    // }
    //
    // remove(id: number) {
    //   return `This action removes a #${id} game`;
    // }
}
