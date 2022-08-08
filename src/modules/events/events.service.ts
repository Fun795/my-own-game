import { Injectable } from "@nestjs/common";
import { BrokerAsPromised as Broker } from "rascal";
import { EventsRoutingConfig } from "./events.routing.config";
import { PinoLogger } from "nestjs-pino";
import config from "../../config";
import { Question } from "../question/question.entity";

@Injectable()
export class EventsService {
    private broker: Broker;

    constructor(protected readonly logger: PinoLogger) {
        const brokerConfig = new EventsRoutingConfig();
        this.configureBroker(brokerConfig.Config).then(() => {});
    }

    private async configureBroker(brokerConfig): Promise<void> {
        this.broker = await Broker.create(brokerConfig);
        this.broker.on("vhost_initialised", () => {
            this.logger.info("Event service broker was successfully initialized");
        });
        this.broker.on("error", (error) => this.logger.error(error));
    }

    async sendCreateEvent(question: Question): Promise<void> {
        const publication = await this.broker.publish(
            config.amqpConfig.questionEvents.createPublication,
            JSON.stringify({ question })
        );

        publication.on("error", (error) => this.logger.error(error));
    }
}
