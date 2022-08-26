import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Topic } from "./entities/topic.entity";
import { Question } from "../question/question.entity";
import { TopicIdDto, TopicToQuestionDto } from "./dto/topic.dto";

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

    async create(createTopicDto: CreateTopicDto) {
        return await this.topicRepository.save(createTopicDto);
    }

    async topicToQuestion(manyToMany: TopicToQuestionDto): Promise<Topic> {
        const topic: Topic | undefined = await this.topicRepository.findOne({ id: manyToMany.idTopic });
        const question: Question | undefined = await this.questionRepository.findOne({ id: manyToMany.idQuest });

        const topicMany: Topic | undefined = await this.topicRepository.findOne(manyToMany.idTopic, {
            relations: ["questions"]
        });
        if (!topic || !question || !topicMany) {
            return new Topic();
        }
        topic.questions = [question, ...topicMany.questions];

        return await this.topicRepository.save(topic);
    }

    findAllManyTopic() {
        return this.topicRepository.find({
            relations: ["questions"]
        });
    }

    async generateBoard(): Promise<number[]> {
        const pullQuestionPoint = [100, 200, 300, 400, 500];
        const board = {};
        const ids = [];

        const topics = await this.findAllManyTopic();
        const randFiveTopic = topics.sort(() => Math.random() - 0.5).slice(0, 5);

        for (const topic of randFiveTopic) {
            const randQuestion = topic.questions.sort(() => Math.random() - 0.5);

            // board[topic.name] = [];

            for (const point of pullQuestionPoint) {
                const questFindRandOnPoint = randQuestion.find((question) => question.point === point);

                // board[topic.name].push(questFindRandOnPoint);
                if (questFindRandOnPoint) {
                    ids.push(questFindRandOnPoint.id);
                }
            }
        }

        return ids;
    }

    findAll() {
        return this.topicRepository.find();
    }

    async findOne(id: number): Promise<Topic> {
        const topic = await this.topicRepository.findOne({ id });

        if (!topic) {
            throw new NotFoundException("topic not found by id");
        }

        return topic;
    }

    async update(updateTopicDto: UpdateTopicDto): Promise<Topic> {
        return await this.topicRepository.save(updateTopicDto);
    }

    async remove(id: number): Promise<void> {
        const deleted = await this.topicRepository.delete(id).then(({ affected }) => affected);

        if (!deleted) {
            throw new NotFoundException("Topic not found by id");
        }
    }
}
