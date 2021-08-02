import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonLogger } from './shared/providers/winston-logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(WinstonLogger));

  const configService: ConfigService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('India One Visibility Hub API')
    .setDescription('India One Visibility Hub API Swagger documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(configService.get('PORT'));
}
bootstrap();
