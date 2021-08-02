import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AuthProvider } from 'src/enums/auth-provider.enum';
import { Repository } from 'typeorm';
import { UserRoleService } from '../user-role/user-role.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userRoleService: UserRoleService,
  ) {}

  async create(createUserDTO: CreateUserDto): Promise<User> {
    const user = CreateUserDto.toUser(createUserDTO);

    const createdUser = await this.userRepository.save({
      ...user,
      authProvider: AuthProvider.LOCAL,
    });

    await this.userRoleService.updateUserRoles(
      createdUser.id,
      createUserDTO.roles,
    );

    return this.findOne(createdUser.id);
  }

  async update(id: string, updateUserDTO: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOne(id);

    if (id !== updateUserDTO.id) {
      throw new BadRequestException('User update failed');
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

    await this.userRoleService.updateUserRoles(id, updateUserDTO.roles);

    return this.findOne(id);
  }

  async findAll(): Promise<User[]> {
    const queryBuilder = await this.userRepository.createQueryBuilder('users');

    queryBuilder
      .leftJoinAndSelect('users.userRoles', 'roles')
      .leftJoinAndSelect('roles.role', 'role');

    queryBuilder.where({ deleted: false });

    const users = await queryBuilder.getMany();

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          roles: 'user.userRoles',
          role: 'roles.role',
        },
      },
    });
    return user;
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

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          roles: 'user.userRoles',
          role: 'roles.role',
        },
      },
    });
    return user;
  }
}
