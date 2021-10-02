import { Document } from 'mongoose';
import { Role } from './role';
export interface User extends Document {
  _id?: any;
  name: string;
  username: string;
  roles: Role[];
  readonly password: string;
  createdAt?: Date;
  updatedAt?: Date;

  generateAuthToken(): string;
  validatePassword(password: string): Boolean;
}
