import { UserDto } from '../dto';

export interface CreateUserResponse {
  message: string;
  user: UserDto;
}
