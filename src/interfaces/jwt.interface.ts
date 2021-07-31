import { UserDto } from 'src/modules/user/dto';

export interface JwtPayload {
  user: UserDto;
}
