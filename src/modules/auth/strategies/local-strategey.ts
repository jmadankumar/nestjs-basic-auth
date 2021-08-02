import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/entity/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategey extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(username: string, password: string): Promise<User> {
    console.log(username, password);
    return this.authService.login({ email: username, password });
  }
}
