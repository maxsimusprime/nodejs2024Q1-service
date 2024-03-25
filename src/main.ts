import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';

const PORT = Number(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  if (process.env.NODE_ENV !== 'production') {
    const config = await readFile(join(__dirname, '../doc/api.yaml'), {
      encoding: 'utf8',
    });
    const document = SwaggerModule.createDocument(app, parse(config));
    SwaggerModule.setup('doc', app, document);
  }

  await app.listen(PORT);
}
bootstrap();
