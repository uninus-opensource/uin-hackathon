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
  providers: [AccessStrategy, RefreshStrategy],
})
export class AppModule {}
