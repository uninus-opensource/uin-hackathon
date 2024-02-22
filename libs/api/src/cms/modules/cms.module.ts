import { Module } from '@nestjs/common';
import { CMSService } from '../services';
import { CMSController } from '../controllers';

@Module({
  imports: [],
  controllers: [CMSController],
  providers: [CMSService],
})
export class CMSModule {}
