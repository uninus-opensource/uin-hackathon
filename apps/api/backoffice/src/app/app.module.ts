import { Module } from '@nestjs/common';

import {
  TrpcModule,
  ActivityModule,
  AuthModule,
  ProposalModule,
  UserModule,
} from '@psu/api';

@Module({
  imports: [TrpcModule, ActivityModule, AuthModule, ProposalModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
