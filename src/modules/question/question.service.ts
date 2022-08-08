import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Repository } from "typeorm";
import { Question } from "./question.entity";
import { QuestionDto, QuestionCreateDto } from "./question.entityDto";

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

    async replace(question: QuestionDto): Promise<Question> {
        const questionToUpdate = await this.questionRepository.findOne({
            id: question.id
        });

        const replaced: QuestionDto = Object.assign({}, questionToUpdate, question);

        return await this.questionRepository.save(replaced);
    }

    async remove(id: number): Promise<number> {
        return await this.questionRepository.delete(id).then(({ affected }) => affected);
    }

    async create(question: QuestionCreateDto): Promise<QuestionDto> {
        await this.questionRepository.insert(question);
        const questionReturn: QuestionDto = await this.questionRepository.findOne({
            order: { id: "DESC" }
        });

        return questionReturn;
    }
}
