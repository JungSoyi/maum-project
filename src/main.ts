import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { existsSync, mkdirSync } from 'fs';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './global/http-exception.filter';
import { setupSwagger } from './global/swagger';

declare const module: any;

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const uploadPath = 'uploads';

  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath);
  }

  /*전역 예외필터설정*/
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD.PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: true,
    }),
  );

  setupSwagger(app);

  const port = 4000;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`);
}

bootstrap();
