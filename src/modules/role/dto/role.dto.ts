import { Role } from 'src/entity/role.entity';

export class RoleDto {
  id: string;
  name: string;

  static from(role: Role): RoleDto {
    const roleDto = new RoleDto();
    roleDto.id = role.id;
    roleDto.name = role.name;
    return roleDto;
  }

  static toUser(roleDto: RoleDto): Role {
    const role = new Role();
    role.id = roleDto.id;
    role.name = roleDto.name;
    return role;
  }
}
