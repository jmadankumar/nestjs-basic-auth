import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/entity/user-role.entity';
import { Repository } from 'typeorm';
import { RoleDto } from '../role/dto';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async createUserRoles(
    userId: string,
    roleIds: string[],
  ): Promise<UserRole[]> {
    const userRoles = roleIds.map((roleId) => {
      const userRole = new UserRole();
      userRole.userId = userId;
      userRole.roleId = roleId;
      return userRole;
    });
    return this.userRoleRepository.save(userRoles);
  }

  async deleteUserRoles(userId: string, roleIds: string[]): Promise<void> {
    for (const roleId of roleIds) {
      await this.userRoleRepository.delete({
        userId,
        roleId,
      });
    }
  }

  async updateUserRoles(userId: string, roles: RoleDto[]) {
    const userRolesInDB = await this.userRoleRepository.find({
      where: {
        userId,
      },
      join: {
        alias: 'userRole',
        leftJoinAndSelect: {
          role: 'userRole.role',
        },
      },
    });

    // roles selected by admin
    const updatedRoleIds = roles.map((role) => role.id);

    const roleIdsInDB = userRolesInDB.map((userRole) => userRole.role.id);

    const roleIdsToDelete = roleIdsInDB.filter(
      (roleId) => updatedRoleIds.indexOf(roleId) === -1,
    );

    const roleIdsToAdd = updatedRoleIds.filter(
      (roleId) => roleIdsInDB.indexOf(roleId) === -1,
    );

    await this.deleteUserRoles(userId, roleIdsToDelete);
    await this.createUserRoles(userId, roleIdsToAdd);
  }
}
