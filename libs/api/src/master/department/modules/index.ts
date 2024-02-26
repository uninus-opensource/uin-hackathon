import { Module } from '@nestjs/common';
import { DepartmentController } from '../controllers';
import { DepartmentService } from '../services';

@Module({
  imports: [],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
