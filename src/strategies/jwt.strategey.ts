import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {
  JWT_ALGORITHM,
  JWT_EXPIRES_IN,
  JWT_SECRET,
} from 'src/config/constants';
import { JwtPayload } from 'src/interfaces';

@Injectable()
export class JwtStrategey extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRET),
      algorithm: configService.get(JWT_ALGORITHM) || 'HS256',
      expiresIn: configService.get(JWT_EXPIRES_IN) || '14d',
    });
  }

  async validate(payload: JwtPayload) {
    return payload.user;
  }
}
