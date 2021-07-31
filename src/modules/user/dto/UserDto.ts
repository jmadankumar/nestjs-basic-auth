import { User } from 'src/entity/user.entity';
import { Gender } from 'src/enums/gender.enum';
import { RoleDto } from 'src/modules/role/dto';

export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: Date;
  imageUrl: string;
  mobile: string;
  email: string;
  roles: RoleDto[];

  static from(user: User): UserDto {
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.firstName = user.firstName;
    userDto.lastName = user.lastName;
    userDto.gender = user.gender;
    userDto.dob = user.dob;
    userDto.imageUrl = user.imageUrl;
    userDto.mobile = user.mobile;
    userDto.email = user.email;
    userDto.roles = user.userRoles?.map((userRole) =>
      RoleDto.from(userRole.role),
    );

    return userDto;
  }
}
