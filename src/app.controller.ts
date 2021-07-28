import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WinstonLogger } from './shared/providers/winston-logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private logger: WinstonLogger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.log('Hello');
    return this.appService.getHello();
  }
}
