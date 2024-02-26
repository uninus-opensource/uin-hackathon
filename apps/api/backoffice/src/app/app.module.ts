import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import {
  UserModule,
  DrizzleModule,
  AccessStrategy,
  RefreshStrategy,
  GoogleStrategy,
  ActivityModule,
  AuthModule,
  EmailModule,
  FileModule,
  OgranizationModule,
  RoleModule,
} from '@psu/api';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'access',
    }),
    AuthModule,
    UserModule,
    ActivityModule,
    OgranizationModule,
    RoleModule,
    DrizzleModule,
    EmailModule,
    FileModule,
  ],
  controllers: [],
  providers: [AccessStrategy, RefreshStrategy, GoogleStrategy],
})
export class AppModule {}
