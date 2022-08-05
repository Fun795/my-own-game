import config from "../../config";

const amqpConfig = config.amqpConfig;
const questionEvents = config.amqpConfig.questionEvents;

export class EventsRoutingConfig {
    public Config: Record<string, any>;

    constructor() {
        this.Config = {
            vhosts: {
                "/": {
                    connection: {
                        url: `amqp://${amqpConfig.username}:${amqpConfig.password}@${amqpConfig.host}:${amqpConfig.port}/`
                    },
                    exchanges: [questionEvents.exchange],
                    publications: {
                        orders_create: {
                            vhost: "test",
                            exchange: questionEvents.exchange,
                            routingKey: questionEvents.createEventRoutingKey
                        },
                        orders_update: {
                            exchange: questionEvents.exchange,
                            routingKey: questionEvents.updateEventRoutingKey
                        }
                    }
                }
            }
        };
    }
}
