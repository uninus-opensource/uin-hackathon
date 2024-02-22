import { Module } from '@nestjs/common';
import { CMSModule } from '@psu/api';
@Module({
  imports: [CMSModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
