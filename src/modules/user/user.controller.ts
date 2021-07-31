import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import {
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from './response';
import { UserService } from './user.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
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
  @ApiResponse({ status: 201, description: 'User created' })
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
