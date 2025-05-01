import { Address } from './address.model';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export type UserDto = {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  addresses?: Address[];
  phone?: string;
};
