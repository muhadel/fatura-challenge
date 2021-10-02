import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Role } from '../types/role';
import { User } from '../types/user';
import { usersStub } from './stubs/user.stub';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Role') private readonly roleModel: Model<Role>,
  ) {}

  async seed(): Promise<any> {
    console.log('seeding users...');
    const roleFullAccess = await this.roleModel.findOne({ name: 'RoleFullAccess' });
    const authFullAccess = await this.roleModel.findOne({ name: 'AuthFullAccess' });
    // Add Role to the first user
    usersStub[0].roles.push(roleFullAccess, authFullAccess);

    // Insert into the database.
    return this.userModel.insertMany(usersStub);
  }

  async drop(): Promise<any> {
    console.log('droping users...');
    return this.userModel.deleteMany({});
  }
}
