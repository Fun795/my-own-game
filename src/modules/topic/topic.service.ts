import { Injectable, NotFoundException } from "@nestjs/common";
import { TopicCreateDto, TopicUpdateDto, TopicToQuestionDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Topic } from "./entities/topic.entity";
import { Question } from "../question/question.entity";

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic)
        private topicRepository: Repository<Topic>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectPinoLogger(TopicService.name)
        private readonly logger: PinoLogger
    ) {}

    async create(createTopicDto: TopicCreateDto): Promise<Topic> {
        return await this.topicRepository.save(createTopicDto);
    }

    async findRandTopics(count = 1): Promise<Topic[]> {
        return await this.topicRepository
            .createQueryBuilder("topic")
            .select("id")
            .orderBy("RANDOM()")
            .limit(count)
            .execute();
    }

    async findAll(): Promise<Topic[]> {
        return await this.topicRepository.find();
    }

    async findOne(id: number): Promise<Topic> {
        const topic = await this.topicRepository.findOne({ id });

        if (!topic) {
            throw new NotFoundException("topic not found by id");
        }

        return topic;
    }

    async update(updateTopicDto: TopicUpdateDto): Promise<Topic> {
        return await this.topicRepository.save(updateTopicDto);
    }

    async remove(id: number): Promise<void> {
        const deleted = await this.topicRepository.delete(id).then(({ affected }) => affected);

        if (!deleted) {
            throw new NotFoundException("Topic not found by id");
        }
    }
}
