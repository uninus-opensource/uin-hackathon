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
} from '@psu/api';

@Module({
  imports: [
    ActivityModule,
    AuthModule,
    UserModule,
    DrizzleModule,
    EmailModule,
    PassportModule.register({
      defaultStrategy: 'access',
    }),
  ],
  controllers: [],
  providers: [AccessStrategy, RefreshStrategy, GoogleStrategy],
})
export class AppModule {}
