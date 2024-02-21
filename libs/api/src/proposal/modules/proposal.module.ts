import { Module } from '@nestjs/common';

import { ProposalService } from '../services';
import { ProposalController } from '../controllers';

@Module({
  imports: [],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}
