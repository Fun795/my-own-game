import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Repository } from "typeorm";
import { Question } from "./question.entity";
import { QuestionDto } from "./dto/question.entity.dto";
import { Topic } from "../topic/entities/topic.entity";
import { TopicService } from "../topic/topic.service";
import { EventsService } from "../events/events.service";
import { QuestionCreateDto } from "./dto/question.create.dto";
import { QuestionUpdateDto } from "./dto/question.update.dto";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Topic)
        private topicRepository: Repository<Topic>,
        private topicService: TopicService,
        private eventService: EventsService,
        @InjectPinoLogger(QuestionService.name)
        private readonly logger: PinoLogger
    ) {}

    findAll(): Promise<Question[]> {
        this.logger.info("findAll");

        return this.questionRepository.find();
    }

    async findOne(id: number): Promise<Question> {
        const question = await this.questionRepository.findOne(id, {
            relations: ["topic"]
        });

        if (!question) {
            throw new NotFoundException("question not found by id");
        }

        return question;
    }

    async update(question: QuestionUpdateDto): Promise<Question> {
        const questionToUpdate = await this.findOne(question.id);

        if (question.topicId) {
            questionToUpdate.topic = await this.topicService.findOne(question.topicId);
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

    async remove(id: number): Promise<void> {
        const deleted = await this.questionRepository.delete(id).then(({ affected }) => affected);

        if (!deleted) {
            throw new NotFoundException("Question not found by id");
        }
    }

    async create(questionCreateDto: QuestionCreateDto): Promise<QuestionDto> {
        questionCreateDto.topic = await this.topicService.findOne(questionCreateDto.topicId);

        const result = await this.questionRepository.save(questionCreateDto);

        await this.eventService.sendCreateEvent(result);

        return result;
    }
}
