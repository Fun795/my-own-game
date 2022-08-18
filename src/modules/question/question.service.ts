import { Injectable } from "@nestjs/common";
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

    findOne(id: number): Promise<Question> {
        return this.questionRepository.findOne({ id });
    }

    async replace(question: QuestionReplaceDto): Promise<Question> {
        const questionToUpdate = await this.questionRepository.findOne({
            id: question.id
        });

        const replaced: QuestionDto = Object.assign({}, questionToUpdate, question);

        await this.questionRepository.save(replaced);

        const topicQuestion = await this.topicService.topicToQuestion({idQuest: Number(question.id), idTopic: Number(question.topic_id) })
        if (question.topic_id){
            const topic = await this.topicRepository.findOne(question.topic_id)
            topic.questions = topicQuestion.questions;
            await this.topicRepository.save(topic);
        }


        return questionToUpdate;
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

        const questionReturn: Question = await this.questionRepository.findOne({
            order: { id: "DESC" }
        });
        const topicQuestion = await this.topicService.topicToQuestion({idQuest: questionReturn.id, idTopic: Number(question.topic_id) })
        if (question.topic_id) {
            const topic = await this.topicRepository.findOne(question.topic_id)
            topic.questions = topicQuestion.questions;
            await this.topicRepository.save(topic);
        }

        return questionReturn;
    }
}
