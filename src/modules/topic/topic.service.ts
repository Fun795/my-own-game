import { Injectable } from "@nestjs/common";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Topic } from "./entities/topic.entity";
import { Question } from "../question/question.entity";
import { TopicToQuestionDto } from "./dto/topic.dto";

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
        await this.topicRepository.save(createTopicDto);

        const topicReturn: CreateTopicDto = await this.topicRepository.findOne({
            order: { id: "DESC" }
        });

        return topicReturn;
    }

    async topicToQuestion(manyToMany: TopicToQuestionDto) {
        const topic: Topic = await this.topicRepository.findOne({ id: manyToMany.idTopic });
        const question: Question = await this.questionRepository.findOne({ id: manyToMany.idQuest });

        const topicMany: Topic = await this.topicRepository.findOne(manyToMany.idTopic, {
            relations: ["questions"]
        });

        topic.questions = [question, ...topicMany.questions];

        return await this.topicRepository.save(topic);
    }

    findAllManyTopic() {
        return this.topicRepository.find({
            relations: ["questions"]
        });
    }

    async generateBoard() {
        const pullQuestionPoint = [100, 200, 300, 400, 500];
        const board = {};
        const ids = [];

        const topics = await this.findAllManyTopic();
        const randFiveTopic = topics.sort(() => Math.random() - 0.5).slice(0, 5);

        for (const topic of randFiveTopic) {
            const randQuestion = topic.questions.sort(() => Math.random() - 0.5);

            board[topic.name] = [];

            for (const point of pullQuestionPoint) {
                const questFindRandOnPoint = randQuestion.find((question) => question.point === point);

                // board[topic.name].push(questFindRandOnPoint);
                if(questFindRandOnPoint){
                    ids.push(questFindRandOnPoint.id);
                }

            }
        }

        return ids ;
    }

    findAll() {
        return this.topicRepository.find();
    }

    findOne(id: number) {
        return this.topicRepository.findOne({ id });
    }

    async update(updateTopicDto: UpdateTopicDto) {
        return await this.topicRepository.save(updateTopicDto);
    }

    async remove(id: number) {
        return await this.topicRepository.delete(id);
    }
}
