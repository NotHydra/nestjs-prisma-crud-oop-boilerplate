import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { ConfigService } from "./config/config.service";

async function bootstrap(): Promise<void> {
    const app: INestApplication<AppModule> = await NestFactory.create<INestApplication<AppModule>>(AppModule);

    const configService: ConfigService = app.get(ConfigService);
    const globalPrefix: string = "api";

    app.enableCors({
        allowedHeaders: "*",
        origin: "*",
        methods: "*",
    });

    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe());

    SwaggerModule.setup(
        globalPrefix,
        app,
        SwaggerModule.createDocument(app, new DocumentBuilder().setTitle("NestJS Prisma OOP CRUD Boilerplate").build())
    );

    await app.listen(configService.getPort());

    Logger.log(`🚀 Application is running on: http://localhost:${configService.getPort()}/${globalPrefix}`);
}

bootstrap();
