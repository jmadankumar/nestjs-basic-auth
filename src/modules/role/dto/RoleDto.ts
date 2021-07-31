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
}
