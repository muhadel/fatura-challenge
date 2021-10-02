import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { User } from '../../types/user';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOne(filter: FilterQuery<User>, projection = {}): Promise<User> {
    return await this.userModel
      .findOne(filter, projection)
      .populate('roles', 'name resource actions');
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findByIdAndUpdate(userId: string, updateQuery: any): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(userId, updateQuery, { new: true })
      .select('-password');
  }
}
