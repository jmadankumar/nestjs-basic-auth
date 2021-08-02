import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategey } from '../../strategies/local.strategey';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  JWT_ALGORITHM,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from 'src/config/constants';
import { JwtStrategey } from 'src/strategies/jwt.strategey';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get(JWT_SECRET),
          signOptions: {
            algorithm: configService.get(JWT_ALGORITHM) || 'HS256',
            expiresIn: configService.get(JWT_EXPIRES_IN) || '14d',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategey, JwtStrategey],
})
export class AuthModule {}
