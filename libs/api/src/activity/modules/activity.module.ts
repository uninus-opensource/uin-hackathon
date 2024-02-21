import { Module } from '@nestjs/common';

import { ActivityService } from '../services';
import { ActivityController } from '../controllers';

@Module({
  imports: [],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
