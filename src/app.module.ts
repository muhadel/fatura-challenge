import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { mongodbConfig } from './config/mongodb.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { RevokedTokenModule } from './modules/revoked-token/revoked-token.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongodbConfig.uri, mongodbConfig.mongooseOptions),
    SharedModule,
    AuthModule,
    UserModule,
    DatabaseModule,
    RevokedTokenModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
