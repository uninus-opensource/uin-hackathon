import { Module } from '@nestjs/common';
import { ActivityService } from '../services';

@Module({
  imports: [],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
