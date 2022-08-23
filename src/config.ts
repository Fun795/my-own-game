// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

class Config {
    server = {
        restPort: process.env.REST_PORT,
        swaggerEnabled: process.env.SWAGGER_ENABLED === "true"
        // requestLimitSize: "10mb"
    };
    postgresql = {
        port: Number(process.env.POSTGRESQL_PORT),
        host: process.env.POSTGRESQL_HOST,
        db: process.env.POSTGRESQL_DB,
        user: process.env.POSTGRESQL_USERNAME,
        password: process.env.POSTGRESQL_PASSWORD
        // requestLimitSize: "10mb"
    };
    amqpConfig = {
        host: process.env.AMQP_HOST,
        port: process.env.AMQP_PORT,
        username: process.env.AMQP_USERNAME,
        password: process.env.AMQP_PASSWORD,
        url: process.env.AMQP_URL,

        //TODO использовать переменные из .ENV
        questionEvents: {
            exchange: "question",
            queues: "question_queues",
            createPublication: "question_create",
            createEventRoutingKey: "question.event.create",
            updatePublication: "question_update",
            updateEventRoutingKey: "question.event.update",
            completePublication: "question_complete",
            completeEventRoutingKey: "question.event.complete"
        }
    };
    logLevel: string = process.env.LOG_LEVEL || "info";
}

export default new Config();
