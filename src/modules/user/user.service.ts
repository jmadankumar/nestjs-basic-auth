import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AuthProvider } from 'src/enums/auth-provider.enum';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDto): Promise<UserDto> {
    const user = CreateUserDto.toUser(createUserDTO);

    const createdUser = await this.userRepository.save({
      ...user,
      authProvider: AuthProvider.LOCAL,
    });
    return UserDto.from(createdUser);
  }

  async update(id: string, updateUserDTO: UpdateUserDto): Promise<UserDto> {
    const userToUpdate = await this.userRepository.findOne(id);

    if (id !== updateUserDTO.id) {
      throw new BadRequestException('Cannot update user');
    }

    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    const updateResult = await this.userRepository.update(
      id,
      this.userRepository.merge(
        userToUpdate,
        UpdateUserDto.toUser(updateUserDTO),
      ),
    );

    if (!updateResult) {
      throw new BadRequestException('User update failed');
    }

    return this.findOne(id);
  }

  async findAll(): Promise<UserDto[]> {
    const queryBuilder = await this.userRepository.createQueryBuilder('users');

    queryBuilder
      .leftJoinAndSelect('users.userRoles', 'roles')
      .leftJoinAndSelect('roles.role', 'role');

    queryBuilder.where({ deleted: false });

    const users = await queryBuilder.getMany();

    return users.map((user) => UserDto.from(user));
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne(id, {
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          roles: 'user.userRoles',
          role: 'roles.role',
        },
      },
    });
    return UserDto.from(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException('Unable to delete user');
    }
    const updateResult = await this.userRepository.update(id, {
      deleted: true,
      updatedDate: new Date(),
    });

    if (!updateResult) {
      throw new BadRequestException('Unable to delete user');
    }
  }
}
