import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserRepository } from './user.repository';
import { JwtStrategy } from '../../guards/jwt.guard';
import { RevokedTokenService } from '../revoked-token/revoked-token.service';
import { RevokedTokenRepository } from '../revoked-token/revoked-token.repository';
import { RevokedTokenSchema } from '../revoked-token/revoked-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'RevokedToken', schema: RevokedTokenSchema }]),
  ],
  providers: [
    UserService,
    UserRepository,
    RevokedTokenService,
    RevokedTokenRepository,
    JwtStrategy,
  ],
})
export class UserModule {}
