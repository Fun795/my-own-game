// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

class Config {
    server = {
        restPort: process.env.REST_PORT,
        swaggerEnabled: process.env.SWAGGER_ENABLED === "true"
        // requestLimitSize: "10mb"
    };
    postgresql = {
        restPort: process.env.POSTGRESQL_HOST,
        db: process.env.POSTGRESQL_DB,
        user: process.env.POSTGRESQL_USERNAME,
        password: process.env.POSTGRESQL_PASSWORD
        // requestLimitSize: "10mb"
    };
    // amqpConfig = {
    //     host: process.env.AMQP_HOST,
    //     port: process.env.AMQP_PORT,
    //     username: process.env.AMQP_USERNAME,
    //     password: process.env.AMQP_PASSWORD,
    //     url: process.env.AMQP_URL,
    //
    //     ordersEvents: {
    //         exchange: "lmru.bpms.ved:orders",
    //         createPublication: "orders_create",
    //         createEventRoutingKey: "orders.event.create",
    //         updatePublication: "orders_update",
    //         updateEventRoutingKey: "orders.event.update"
    //     }
    // };
    mongodb = {
        url: process.env.MONGODB_URL
    };
    logLevel: string = process.env.LOG_LEVEL || "info";
}

export default new Config();
