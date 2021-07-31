import { User } from 'src/entity/user.entity';
import { Gender } from 'src/enums/gender.enum';
import { RoleDto } from '../../role/dto/RoleDto';

export class UpdateUserDto {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: Date;
  imageUrl: string;
  mobile: string;
  email: string;
  roles: RoleDto[];

  static toUser(updateUserDto: UpdateUserDto): User {
    const user = new User();
    user.id = updateUserDto.id;
    user.firstName = updateUserDto.firstName;
    user.lastName = updateUserDto.lastName;
    user.gender = updateUserDto.gender;
    user.dob = updateUserDto.dob;
    user.imageUrl = updateUserDto.imageUrl;
    user.mobile = updateUserDto.mobile;
    user.email = updateUserDto.email;
    return user;
  }
}
