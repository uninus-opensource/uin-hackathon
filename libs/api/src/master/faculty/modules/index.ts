import { Module } from '@nestjs/common';
import { FacultyController } from '../controllers';
import { FacultyService } from '../services';

@Module({
  imports: [],
  controllers: [FacultyController],
  providers: [FacultyService],
})
export class FacultyModule {}
