import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Role } from '../types/role';
import { rolesStub } from './stubs/role.stub';

@Injectable()
export class RolesSeeder implements Seeder {
  constructor(@InjectModel('Role') private readonly roleModel: Model<Role>) {}

  async seed(): Promise<any> {
    console.log('seeding roles...');
    // Insert into the database.
    return this.roleModel.insertMany(rolesStub);
  }

  async drop(): Promise<any> {
    console.log('droping roles...');
    return this.roleModel.deleteMany({});
  }
}
