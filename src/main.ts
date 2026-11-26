import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
