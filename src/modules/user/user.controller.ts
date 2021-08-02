import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from './dto';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/enums/role.enum';

@ApiTags('users')
@Controller('users')
@Roles(RoleEnum.ADMIN)
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => UserDto.from(user));
  }

  @Get('/:id')
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.findOne(id);
    return UserDto.from(user);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: CreateUserDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    const user = await this.userService.create(createUserDto);
    return {
      message: 'User created',
      user: UserDto.from(user),
    };
  }

  @Put(':id')
  @ApiResponse({ status: 400, description: 'User update failed' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    const user = await this.userService.update(id, updateUserDto);
    return {
      message: 'User created',
      user: UserDto.from(user),
    };
  }

  @Delete(':id')
  @ApiResponse({ status: 400, description: 'Unable to delete user' })
  async remove(@Param('id') id: string): Promise<DeleteUserResponse> {
    await this.userService.delete(id);
    return {
      message: 'User deleted',
    };
  }
}
