import { Injectable } from "@nestjs/common";
import { BrokerAsPromised as Broker } from "rascal";
import { EventsRoutingConfig } from "./events.routing.config";
import { PinoLogger } from "nestjs-pino";
import config from "../../config";

@Injectable()
export class EventsService {
    private broker: Broker;

    constructor(protected readonly logger: PinoLogger) {
        const brokerConfig = new EventsRoutingConfig();
        this.configureBroker(brokerConfig.Config).then(() => {});
    }

    private async configureBroker(brokerConfig): Promise<void> {
        this.broker = await Broker.create(brokerConfig);
        this.broker.on(config.amqpConfig.questionEvents.createPublication, () => {
            console.log(3);
            this.logger.info("Event service broker was successfully initialized");
        });
        this.broker.on("error", (error) => this.logger.error(error));
    }

    async sendChangeEvent(test: string): Promise<void> {
        console.log(1);
        const publication = await this.broker.publish(
            config.amqpConfig.questionEvents.createPublication,
            JSON.stringify({ test: test })
        );

        console.log(2);
        publication.on("error", (error) => this.logger.error(error));
    }
}
