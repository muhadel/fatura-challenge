import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery } from 'mongoose';
import { Model } from 'mongoose';
import { Role } from '../../types/role';
import { CreateRoleReqDto } from './dto';

@Injectable()
export class RoleRepository {
  constructor(@InjectModel('Role') private roleModel: Model<Role>) {}

  async create(role: CreateRoleReqDto): Promise<Role> {
    const roleCreated = new this.roleModel(role);
    return roleCreated.save();
  }

  async findOne(filter: FilterQuery<Role>): Promise<Role> {
    return await this.roleModel.findOne(filter);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleModel.find();
  }
}
