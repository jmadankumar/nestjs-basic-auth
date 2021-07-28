import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from './shared/providers/winston-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(WinstonLogger));

  const configService: ConfigService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
  });

  await app.listen(configService.get('PORT'));
}
bootstrap();
