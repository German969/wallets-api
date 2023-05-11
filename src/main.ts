import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const CORS_CLIENTS = configService.get<string>('CORS_CLIENTS');
  app.enableCors({
    origin: [...CORS_CLIENTS.split(',')],
  });

  await app.listen(3000);
}
bootstrap();
