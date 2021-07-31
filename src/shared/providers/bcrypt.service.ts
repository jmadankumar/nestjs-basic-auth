import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BCryptService {
  constructor(private configService: ConfigService) {}

  async createPasswordHash(password: string): Promise<string> {
    const saltRound = this.configService.get('PASSWORD_SALT') || 10;
    return bcrypt.hash(password, +saltRound);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
