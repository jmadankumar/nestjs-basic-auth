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

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param() id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    const user = await this.userService.create(createUserDto);
    return {
      message: 'User created',
      user,
    };
  }

  @Put(':id')
  async update(
    @Param() id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    const user = await this.userService.update(id, updateUserDto);
    return {
      message: 'User created',
      user,
    };
  }

  @Delete(':id')
  async remove(@Param() id: string): Promise<DeleteUserResponse> {
    await this.userService.delete(id);
    return {
      message: 'User deleted',
    };
  }
}
