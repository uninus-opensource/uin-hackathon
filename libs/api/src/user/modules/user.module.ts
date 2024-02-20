import { Module } from '@nestjs/common';

import { ActivityService, ActivityController } from '..';

@Module({
  imports: [],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class UserModule {}
