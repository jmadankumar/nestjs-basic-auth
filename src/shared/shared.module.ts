import { Module, Global } from '@nestjs/common';
import { WinstonLogger } from './providers/winston-logger.service';

@Global()
@Module({
  providers: [WinstonLogger],
  exports: [WinstonLogger],
})
export class SharedModule {}
