import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';
import { RoleSchema } from './role.schema';
import { RoleController } from './role.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [RoleService, RoleRepository, UserService, UserRepository],
  controllers: [RoleController],
})
export class RoleModule {}
