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
                    queues: [questionEvents.queues],
                    bindings: [
                        `${questionEvents.exchange}[${questionEvents.createEventRoutingKey}] -> ${questionEvents.queues}` // ["question[a.b.c] -> demo_q"]
                    ],
                    publications: {
                        question_create: {
                            exchange: questionEvents.exchange,
                            routingKey: questionEvents.createEventRoutingKey
                        },
                        question_update: {
                            exchange: questionEvents.exchange,
                            routingKey: questionEvents.updateEventRoutingKey
                        },
                        question_complete: {
                            exchange: questionEvents.exchange,
                            routingKey: questionEvents.completeEventRoutingKey
                        }
                    }
                }
            }
        };
    }
}
