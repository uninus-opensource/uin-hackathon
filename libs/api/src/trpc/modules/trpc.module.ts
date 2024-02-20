import { Module } from '@nestjs/common';
import { TrpcService, TrpcRouter } from '..';

@Module({
  imports: [],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
