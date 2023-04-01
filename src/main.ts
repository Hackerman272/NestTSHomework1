import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
// import {JwtAuthGuard} from "./auth/jwt-auth.guard";
// import {ValidationPipe} from "./pipes/validation.pipe"; // нужно доработать, прокинув поддержку трансформирования значений
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle("First NestJS project")
      .setDescription("Документация REST API проекта")
      .setVersion("0.0.1")
      .addTag("KSP")
      .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  // Доступ по токену для всех запросов
  // app.useGlobalGuards(JwtAuthGuard)

  // глобальное использование пайпов для всех запросов
  // app.useGlobalPipes(new ValidationPipe())
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
