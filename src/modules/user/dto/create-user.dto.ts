import { User } from 'src/entity/user.entity';
import { Gender } from 'src/enums/gender.enum';
import { RoleDto } from '../../role/dto';
import { UserDto } from './user.dto';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: Date;
  imageUrl: string;
  mobile: string;
  email: string;
  roles: RoleDto[];

  static toUser(createUserDto: CreateUserDto): User {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.gender = createUserDto.gender;
    user.dob = createUserDto.dob;
    user.imageUrl = createUserDto.imageUrl;
    user.mobile = createUserDto.mobile;
    user.email = createUserDto.email;
    return user;
  }
}

export class CreateUserResponse {
  message: string;
  user: UserDto;
}
