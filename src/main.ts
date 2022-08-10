import { BaseExceptionFilter, NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger, PinoLogger } from "nestjs-pino";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    const configService = app.get(ConfigService);

    app.useLogger(app.get(Logger));

    const logger = await app.resolve<PinoLogger>(PinoLogger);
    const config = new DocumentBuilder()
        .setTitle("My own game")
        .setDescription("The My own game API description")
        .setVersion("1.0")
        .addTag("mog")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    // app.useGlobalFilters(new BaseExceptionFilter(await app.resolve<PinoLogger>(PinoLogger)));
    app.useGlobalFilters(new BaseExceptionFilter());

    const restPort = configService.get("server.restPort");
    await app.listen(restPort);

    logger.info("Service was started");
}

bootstrap();
