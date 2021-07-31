import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from 'src/interfaces';
import { BCryptService } from 'src/shared/providers/bcrypt.service';
import { JwtService } from 'src/shared/providers/jwt.service';
import { UserDto } from '../user/dto';
import { AuthService } from './auth.service';
import { LoginOptions } from './dto/login.dto';
import { LoginResponse, LogoutResponse } from './response';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private bcryptService: BCryptService,
  ) {}

  @Post('login')
  async login(@Body() options: LoginOptions): Promise<LoginResponse> {
    try {
      const user = await this.authService.login(options);
      const userDto = UserDto.from(user);

      const payload: JwtPayload = {
        user: userDto,
      };

      const jwtToken = await this.jwtService.sign(payload);

      return {
        message: 'Successful login',
        user: userDto,
        token: jwtToken,
      };
    } catch (error) {
      throw new InternalServerErrorException('Unable to login');
    }
  }

  @Post('logout')
  async logout(): Promise<LogoutResponse> {
    return { message: 'Successfull logout' };
  }

  @Post('hash-password/:password')
  async createHashPassword(
    @Param('password') password: string,
  ): Promise<string> {
    return this.bcryptService.createPasswordHash(password);
  }
}
