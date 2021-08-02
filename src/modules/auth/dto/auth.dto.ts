import { UserDto } from 'src/modules/user/dto';

export class LoginOptions {
  email: string;
  password: string;
}

export class LoginResponse {
  message: string;
  user: UserDto;
  token: string;
}

export class LogoutResponse {
  message: string;
}
