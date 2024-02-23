import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import {
  ActivityModule,
  AuthModule,
  ProposalModule,
  UserModule,
  DrizzleModule,
  AccessStrategy,
  RefreshStrategy,
  GoogleStrategy,
} from '@psu/api';

@Module({
  imports: [
    ActivityModule,
    AuthModule,
    ProposalModule,
    UserModule,
    DrizzleModule,
    PassportModule.register({
      defaultStrategy: 'access',
    }),
  ],
  controllers: [],
  providers: [AccessStrategy, RefreshStrategy, GoogleStrategy],
})
export class AppModule {}
