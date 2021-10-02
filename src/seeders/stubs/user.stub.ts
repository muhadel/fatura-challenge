import { hashSync, genSaltSync } from 'bcrypt';
import { config } from '../../config/app.config';
export const usersStub = [
  {
    name: 'sysuser',
    username: 'sysuser',
    plainTextPassword: 'P@ssw0rd',
    password: hashSync('P@ssw0rd', genSaltSync(config.salt)),
    roles: [],
  },
  {
    name: 'sysuser1',
    username: 'sysuser1',
    plainTextPassword: 'P@ssw0rd',
    password: hashSync('P@ssw0rd', genSaltSync(config.salt)),
    roles: [],
  },
];
