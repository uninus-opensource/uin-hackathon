import { Module } from '@nestjs/common';

import { ProposalService, ProposalController } from '..';

@Module({
  imports: [],
  controllers: [ProposalController],
  providers: [ProposalService],
})
export class ProposalModule {}
