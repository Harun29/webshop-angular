import {UserDto} from './user.model';

export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  street: string;
  city: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  country: string;
};

export type LoginResponseDto = {
  token: string;
  user: UserDto;
};

