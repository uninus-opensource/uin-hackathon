import { Controller, Get } from '@nestjs/common';

import { ProposalService } from '../services';

@Controller()
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get()
  getData() {
    return;
  }
}
