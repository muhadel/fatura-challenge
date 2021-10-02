import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { UserSchema } from '../user/user.schema';
import { RevokedTokenService } from '../revoked-token/revoked-token.service';
import { RevokedTokenRepository } from '../revoked-token/revoked-token.repository';
import { RevokedTokenSchema } from '../revoked-token/revoked-token.schema';
import { JwtStrategy } from '../../guards/jwt.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'RevokedToken', schema: RevokedTokenSchema }]),
  ],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    RevokedTokenService,
    RevokedTokenRepository,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
