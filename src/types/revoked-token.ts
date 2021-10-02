import { User } from './user';

export interface RevokedToken {
  _id?: string;
  token?: string;
  expireIn?: number;
  user?: User | string;
  createdAt?: Date;
  updatedAt?: Date;
}
