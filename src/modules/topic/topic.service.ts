import { Injectable } from "@nestjs/common";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import { Topic } from "./entities/topic.entity";

@Injectable()
export class TopicService {
    constructor(
        @InjectRepository(Topic)
        private topicRepository: Repository<Topic>,
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
