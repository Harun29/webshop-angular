import {Address} from 'node:cluster';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  addresses: Address[];
}
