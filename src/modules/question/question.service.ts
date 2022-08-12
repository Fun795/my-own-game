import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Repository } from "typeorm";
import { Question } from "./question.entity";
import { QuestionCreateDto, QuestionDto } from "./question.entityDto";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectPinoLogger(QuestionService.name)
        private readonly logger: PinoLogger
    ) {}

    findAll(): Promise<Question[]> {
        this.logger.info("findAll");

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

    async findAllManyTopic(): Promise<Question[]> {
        // return await this.questionRepository
        //     .createQueryBuilder("question")
        //     .leftJoinAndSelect("question.topics", "topic")
        //     .getMany();
        return await this.questionRepository.find({
            relations: ["topics"]
        });
    }

    async remove(id: number): Promise<number> {
        return await this.questionRepository.delete(id).then(({ affected }) => affected);
    }

    async create(question: QuestionCreateDto): Promise<QuestionDto> {
        await this.questionRepository.save(question);
        const questionReturn: QuestionDto = await this.questionRepository.findOne({
            order: { id: "DESC" }
        });

        return questionReturn;
    }
}
