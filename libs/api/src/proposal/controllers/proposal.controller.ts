import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ProposalService } from '../services';
import { AccessGuard } from '../../common';

@Controller('proposal')
@UseGuards(AccessGuard)
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.proposalService.findOne(id);
  }

  @Get()
  async findMany(@Query() request: any) {
    return await this.proposalService.findMany(request);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.proposalService.delete(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.proposalService.update({ id, ...data });
  }

  @Post()
  async create(@Body() data: any) {
    return await this.proposalService.create(data);
  }
}
