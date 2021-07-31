import { UserDto } from '../dto';

export interface UpdateUserResponse {
  message: string;
  user: UserDto;
}
