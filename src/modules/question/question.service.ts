import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Repository } from "typeorm";
import { Question } from "./question.entity";
import { QuestionCreateDto, QuestionDto, QuestionReplaceDto } from "./question.entityDto";
import { Topic } from "../topic/entities/topic.entity";
import { TopicService } from "../topic/topic.service";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Topic)
        private topicRepository: Repository<Topic>,
        private topicService: TopicService,
        @InjectPinoLogger(QuestionService.name)
        private readonly logger: PinoLogger
    ) {}

    findAll(): Promise<Question[]> {
        this.logger.info("findAll");

        return this.questionRepository.find();
    }

    async findOne(id: number): Promise<Question> {
        const question = await this.questionRepository.findOne({ id });

        if (!question) {
            throw new NotFoundException("question not found by id");
        }

        return question;
    }

    async update(question: QuestionReplaceDto): Promise<Question> {
        const questionToUpdate = await this.questionRepository.findOne(question.id, {
            relations: ["topic"]
        });

        if (!questionToUpdate) {
            throw new NotFoundException("question not found by id");
        }

        const topic = await this.topicRepository.findOne(question.topicId);

        if (topic) {
            questionToUpdate.topic = topic;
        }

        Object.assign(questionToUpdate, question);

        await this.questionRepository.save(questionToUpdate);

        return questionToUpdate;
    }

    async findAllManyTopic(): Promise<Question[]> {
        return await this.questionRepository.find({
            relations: ["topics"]
        });
    }

    async remove(id: number): Promise<number> {
        const deleted = await this.questionRepository.delete(id).then(({ affected }) => affected);

        if (!deleted) {
            throw new NotFoundException("Question not found by id");
        }

        return deleted;
    }

    async create(questionCreateDto: QuestionCreateDto): Promise<QuestionDto> {
        const topic = await this.topicRepository.findOne(questionCreateDto.topicId);

        if (!topic) {
            throw new NotFoundException("topic not found by id");
        }

        questionCreateDto.topic = topic;

        return await this.questionRepository.save(questionCreateDto);
    }
}
