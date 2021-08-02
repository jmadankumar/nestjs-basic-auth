import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/entity/user.entity';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class LocalStrategey extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(username: string, password: string): Promise<User> {
    return this.authService.login({ email: username, password });
  }
}
