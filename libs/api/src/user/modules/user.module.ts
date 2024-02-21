import { Module } from '@nestjs/common';

import { UserService } from '../services';
import { UserController } from '../controllers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
