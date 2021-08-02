import {
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Messages } from 'src/config/messages';
import { User } from 'src/entity/user.entity';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtPayload } from 'src/interfaces';
import { BCryptService } from 'src/shared/providers/bcrypt.service';
import { JwtService } from 'src/shared/providers/jwt.service';
import { UserDto } from '../user/dto';
import { LoginOptions, LoginResponse, LogoutResponse } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private bcryptService: BCryptService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginOptions })
  @Post('login')
  async login(@Req() req: Request): Promise<LoginResponse> {
    try {
      const user = req.user as User;
      const userDto = UserDto.from(user);

      const payload: JwtPayload = {
        user: userDto,
      };

      const jwtToken = await this.jwtService.sign(payload);

      return {
        message: Messages.LOGIN_SUCCESS,
        user: userDto,
        token: jwtToken,
      };
    } catch (error) {
      throw new InternalServerErrorException(Messages.LOGIN_ERROR);
    }
  }

  @Post('logout')
  async logout(): Promise<LogoutResponse> {
    return { message: Messages.LOGOUT_SUCCESS };
  }

  @Post('hash-password/:password')
  async createHashPassword(
    @Param('password') password: string,
  ): Promise<string> {
    return this.bcryptService.createPasswordHash(password);
  }
}
