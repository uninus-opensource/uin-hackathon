import { Module } from '@nestjs/common';

import { UserService, UserController } from '..';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
