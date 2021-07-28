import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class WinstonLogger implements LoggerService {
  logger: winston.Logger;

  constructor(private configService: ConfigService) {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '10m',
          maxFiles: '7d',
          dirname: configService.get('LOGS_DIR'),
        }),
      ],
    });
    if (process.env.NODE_ENV === 'development') {
      this.logger.add(
        new winston.transports.Console({ format: winston.format.json() }),
      );
    }
  }

  setLogLevels(levels: LogLevel[]) {
    this.logger.level = levels[0];
  }

  log(message: string, ...args: any[]) {
    this.logger.info(message, ...args);
  }

  debug(message: string, ...args: any[]) {
    this.logger.debug(message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.logger.error(message, ...args);
  }

  verbose(message: string, ...args: any[]) {
    this.logger.verbose(message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.logger.warn(message, ...args);
  }
}
