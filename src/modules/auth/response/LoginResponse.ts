import { UserDto } from 'src/modules/user/dto';

export interface LoginResponse {
  message: string;
  user: UserDto;
  token: string;
}
