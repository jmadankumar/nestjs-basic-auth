import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Messages } from 'src/config/messages';
import { User } from 'src/entity/user.entity';
import { BCryptService } from 'src/shared/providers/bcrypt.service';
import { UserService } from '../user/user.service';
import { LoginOptions } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BCryptService,
  ) {}

  async login(options: LoginOptions): Promise<User> {
    const { email, password } = options;

    if (!email || !password) {
      throw new UnauthorizedException(Messages.INVALID_USERNAME_PASSWORD);
    }

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException(Messages.INVALID_USERNAME_PASSWORD);
    }

    const isPasswordMatching = await this.bcryptService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException(Messages.INVALID_USERNAME_PASSWORD);
    }
    return user;
  }

  async logout() {
    return true;
  }
}
