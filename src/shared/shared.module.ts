import { Module, Global } from '@nestjs/common';
import { WinstonLogger } from './providers/winston-logger.service';

@Global()
@Module({
  imports: [],
  providers: [WinstonLogger],
  exports: [WinstonLogger],
})
export class SharedModule {}
