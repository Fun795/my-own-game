import { BaseExceptionFilter, NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger, PinoLogger } from "nestjs-pino";
import { AppModule } from "./app.module";
import Config from "./config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    app.useLogger(app.get(Logger));
    const logger = await app.resolve<PinoLogger>(PinoLogger);
    const config = new DocumentBuilder()
        .setTitle("Cats example")
        .setDescription("The cats API description")
        .setVersion("1.0")
        .addTag("mog")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(Config.server.restPort);
    logger.info("Service was started");
}

bootstrap();
