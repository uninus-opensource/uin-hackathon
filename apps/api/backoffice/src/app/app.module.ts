import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import {
  UserModule,
  DrizzleModule,
  AccessStrategy,
  RefreshStrategy,
  GoogleStrategy,
  TrpcModule,
} from '@psu/api';

@Module({
  imports: [
    UserModule,
    DrizzleModule,
    PassportModule.register({
      defaultStrategy: 'access',
    }),
    TrpcModule,
  ],
  controllers: [],
  providers: [AccessStrategy, RefreshStrategy, GoogleStrategy],
})
export class AppModule {}
