import { Module } from '@nestjs/common';
import { RoleController } from '../controllers';
import { RoleService } from '../services';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
