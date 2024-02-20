import { Module } from '@nestjs/common';
import { TrpcRouter } from '..';

@Module({
  imports: [],
  providers: [TrpcRouter],
})
export class TrpcModule {}
