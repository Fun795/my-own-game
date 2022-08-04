import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { DeleteResult, Repository } from "typeorm";
import { Question } from "./question.entity";
import { QuestionDtoCreate } from "./question.entityDto";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectPinoLogger(QuestionService.name)
        private readonly logger: PinoLogger
    ) {}

    findAll(): Promise<Question[]> {
        return this.questionRepository.find();
    }

    findOne(id: number): Promise<Question> {
        return this.questionRepository.findOne({ id });
    }

    async remove(id: number): Promise<number> {
        return await this.questionRepository.delete(id).then(({ affected }) => affected);
    }

    async create(question: QuestionDtoCreate): Promise<boolean> {
        await this.questionRepository.insert(question);
        return true;
    }
}
