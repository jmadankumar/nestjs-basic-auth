import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { BCryptService } from 'src/shared/providers/bcrypt.service';
import { UserService } from '../user/user.service';
import { LoginOptions } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcryptService: BCryptService,
  ) {}

  async login(options: LoginOptions): Promise<User> {
    const { email, password } = options;

    if (!email || !password) {
      throw new BadRequestException('Invalid email or password');
    }

    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordMatching = await this.bcryptService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid email or password');
    }
    return user;
  }

  async logout() {}
}
