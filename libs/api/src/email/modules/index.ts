import { Module } from '@nestjs/common';
import { EmailService } from '../services';

@Module({
  imports: [],
  controllers: [],
  providers: [EmailService],
})
export class EmailModule {}
