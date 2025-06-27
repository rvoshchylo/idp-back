import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { API_PREFIX } from './common/api-prefix';
import { INestApplication } from '@nestjs/common';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: false,
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors({
    origin: ['https://idp-front-eight.vercel.app', 'http://localhost:3003'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Book App API')
    .setDescription('API for managing books with AI-generated descriptions')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${API_PREFIX}/docs`, app, document);

  app.setGlobalPrefix(API_PREFIX);
  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
void bootstrap();
