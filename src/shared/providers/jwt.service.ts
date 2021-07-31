import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  getSecretKey() {
    return this.configService.get('JWT_SECRET');
  }

  getAlgorithm(): JWT.Algorithm {
    return (
      (this.configService.get('JWT_ALGORITHM') as JWT.Algorithm) || 'HS256'
    );
  }

  getExpiresIn() {
    return this.configService.get('JWT_EXPIRES_IN') || '14d';
  }

  async sign(payload: any): Promise<string> {
    const secretKey = this.getSecretKey();
    const algorithm = this.getAlgorithm();
    const expiresIn = this.getExpiresIn();

    return JWT.sign(payload, secretKey, {
      algorithm,
      expiresIn,
    });
  }

  async verify(token: string): Promise<any> {
    const secretKey = this.getSecretKey();
    const algorithm = this.getAlgorithm();

    return JWT.verify(token, secretKey, { algorithms: [algorithm] });
  }
}
