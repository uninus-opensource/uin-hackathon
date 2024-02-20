import { Module } from '@nestjs/common';

import { AuthService, AuthController } from '..';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
