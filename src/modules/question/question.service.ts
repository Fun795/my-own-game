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

    async replace(question: QuestionReplaceDto): Promise<Question> {
        const questionToUpdate = await this.questionRepository.findOne({
            id: question.id
        });
        if (!questionToUpdate) {
            throw "Error2";
        }
        const replaced: QuestionDto = Object.assign({}, questionToUpdate, question);

        await this.questionRepository.save(replaced);

        const topicQuestion: Topic | boolean = await this.topicService.topicToQuestion({
            idQuest: Number(question.id),
            idTopic: Number(question.topic_id)
        });

        if (question.topic_id) {
            const topic: Topic | undefined = await this.topicRepository.findOne(question.topic_id);
            if (topic) {
                topic.questions = topicQuestion.questions;
                await this.topicRepository.save(topic);
            }
        }

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

    async create(question: QuestionCreateDto): Promise<QuestionDto> {
        const questionReturn: Question = await this.questionRepository.save(question);

        const topicQuestion = await this.topicService.topicToQuestion({
            idQuest: questionReturn.id,
            idTopic: Number(question.topic_id)
        });

        if (question.topic_id) {
            const topic = await this.topicRepository.findOne(question.topic_id);
            if (!topic) {
                throw "error";
            }
            topic.questions = topicQuestion.questions;
            await this.topicRepository.save(topic);
        }

        return questionReturn;
    }
}
