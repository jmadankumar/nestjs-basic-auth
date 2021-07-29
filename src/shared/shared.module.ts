import { Module, Global } from '@nestjs/common';
import { RoleModule } from './modules/role/role.module';
import { WinstonLogger } from './providers/winston-logger.service';

@Global()
@Module({
  imports: [RoleModule],
  providers: [WinstonLogger],
  exports: [WinstonLogger],
})
export class SharedModule {}
