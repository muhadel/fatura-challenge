import 'dotenv/config';
import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleSchema } from './modules/role/role.schema';
import { UserSchema } from './modules/user/user.schema';
import { RevokedTokenSchema } from './modules/revoked-token/revoked-token.schema';
import { RolesSeeder } from './seeders/role.seeder';
import { UserSeeder } from './seeders/user.seeder';
import { RevokeTokensSeeder } from './seeders/revoke-token.seeder';
import { mongodbConfig } from './config/mongodb.config';

seeder({
  imports: [
    MongooseModule.forRoot(mongodbConfig.uri, mongodbConfig.mongooseOptions),
    MongooseModule.forFeature([{ name: 'Role', schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'RevokedToken', schema: RevokedTokenSchema }]),
  ],
}).run([RolesSeeder, UserSeeder, RevokeTokensSeeder]);
