import {Address} from 'node:cluster';

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}
