import { Module } from '@nestjs/common';
import { TrpcRouter } from '../routers';

@Module({
  imports: [],
  providers: [TrpcRouter],
})
export class TrpcModule {}
