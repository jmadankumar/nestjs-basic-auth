import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategey } from './strategies/local-strategey';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategey],
})
export class AuthModule {}
