import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ProposalService } from '../services';
import { AccessGuard } from '../../common';

@Controller('proposal')
@UseGuards(AccessGuard)
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get('/:id')
  async findOne() {
    return await this.proposalService.findOne();
  }

  @Get()
  async findMany() {
    return await this.proposalService.findMany();
  }

  @Delete('/:id')
  async delete() {
    return await this.proposalService.delete();
  }

  @Patch('/:id')
  async update() {
    return await this.proposalService.update();
  }

  @Post()
  async create() {
    return await this.proposalService.create();
  }
}
