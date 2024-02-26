import { Module } from '@nestjs/common';
import { OrganizationController } from '../controllers';
import { OrganizationService } from '../services';

@Module({
  imports: [],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OgranizationModule {}
