import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FilterQuery } from 'mongoose';
import { User } from '../../types/user';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user) {
    return await this.userRepository.create(user);
  }

  async findOne(filter: FilterQuery<User>, projection = {}) {
    return await this.userRepository.findOne(filter, projection);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async assignRole(userId: string, roleId: string) {
    const user = await this.userRepository.findOne({ _id: userId });
    if (!user) {
      throw new HttpException('User is not exists', HttpStatus.BAD_REQUEST);
    }

    const isRoleExists = user.roles.find((r) => r._id === roleId);
    if (isRoleExists) {
      throw new HttpException('User already has the role', HttpStatus.BAD_REQUEST);
    }
    return await this.userRepository.findByIdAndUpdate(userId, {
      $push: { roles: roleId },
    });
  }
}
