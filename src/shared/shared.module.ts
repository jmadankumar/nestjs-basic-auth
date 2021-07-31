import { Module, Global } from '@nestjs/common';
import { BCryptService } from './providers/bcrypt.service';
import { WinstonLogger } from './providers/winston-logger.service';

@Global()
@Module({
  imports: [],
  providers: [WinstonLogger, BCryptService],
  exports: [WinstonLogger, BCryptService],
})
export class SharedModule {}
