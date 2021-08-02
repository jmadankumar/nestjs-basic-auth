import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Messages } from 'src/config/messages';
import { User } from 'src/entity/user.entity';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtPayload } from 'src/interfaces';
import { BCryptService } from 'src/shared/providers/bcrypt.service';
import { UserDto } from '../user/dto';
import { LoginOptions, LoginResponse, LogoutResponse } from './dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private bcryptService: BCryptService,
  ) {}

  @ApiBody({ type: LoginOptions })
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
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

  @ApiBearerAuth()
  @Post('auth/logout')
  @UseGuards(JwtAuthGuard)
  async logout(): Promise<LogoutResponse> {
    return { message: Messages.LOGOUT_SUCCESS };
  }

  @ApiBearerAuth()
  @Post('auth/hash-password/:password')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async createHashPassword(
    @Param('password') password: string,
  ): Promise<string> {
    return this.bcryptService.createPasswordHash(password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  async getProfile(@CurrentUser() user: UserDto): Promise<UserDto> {
    return user;
  }
}
