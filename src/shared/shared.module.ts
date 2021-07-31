import { Module, Global } from '@nestjs/common';
import { BCryptService } from './providers/bcrypt.service';
import { JwtService } from './providers/jwt.service';
import { WinstonLogger } from './providers/winston-logger.service';

@Global()
@Module({
  imports: [],
  providers: [WinstonLogger, BCryptService, JwtService],
  exports: [WinstonLogger, BCryptService, JwtService],
})
export class SharedModule {}
