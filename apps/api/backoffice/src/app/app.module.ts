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
} from '@psu/api';

@Module({
  imports: [
    ActivityModule,
    AuthModule,
    UserModule,
    DrizzleModule,
    EmailModule,
    FileModule,
    PassportModule.register({
      defaultStrategy: 'access',
    }),
  ],
  controllers: [],
  providers: [AccessStrategy, RefreshStrategy, GoogleStrategy],
})
export class AppModule {}
