import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { UserService } from '../user/user.service';
import { Role } from '../../types/role';
import { User } from '../../types/user';
import { CreateRoleReqDto } from './dto';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userService: UserService,
  ) {}

  async createRole(role: CreateRoleReqDto) {
    return this.roleRepository.create(role);
  }

  async getRoleById(id: string): Promise<Role> {
    return this.roleRepository.findOne({ _id: id });
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async assignRoleToUser(userId: string, roleId: string): Promise<User> {
    return this.userService.assignRole(userId, roleId);
  }
}
