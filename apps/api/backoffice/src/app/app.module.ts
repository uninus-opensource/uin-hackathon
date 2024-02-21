import { Module } from '@nestjs/common';

import {
  ActivityModule,
  AuthModule,
  ProposalModule,
  TrpcModule,
  UserModule,
} from '@psu/api';

@Module({
  imports: [ActivityModule, AuthModule, ProposalModule, TrpcModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
