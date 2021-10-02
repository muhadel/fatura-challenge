import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RevokedTokenService } from './revoked-token.service';
import { RevokedTokenSchema, RevokedTokenModel } from './revoked-token.schema';
import { RevokedTokenRepository } from './revoked-token.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'RevokedToken', schema: RevokedTokenSchema }])],
  providers: [RevokedTokenService, RevokedTokenRepository, RevokedTokenModel],
})
export class RevokedTokenModule {}
