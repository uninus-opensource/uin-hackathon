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
import { ActivityService } from '../services';
import { AccessGuard } from '../../common';
import {
  TActivityRequest,
  TPaginationRequest,
  VSCreateActivity,
  VSUpdateActivity,
} from '@psu/entities';
import { ZodValidationPipe } from '../../common/pipes/';

@Controller('activity')
@UseGuards(AccessGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.activityService.findOne(id);
  }

  @Get()
  async findMany(@Query() request: TPaginationRequest) {
    return await this.activityService.findMany(request);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.activityService.delete(id);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateActivity)) data: TActivityRequest
  ) {
    return await this.activityService.update({ id, ...data });
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(VSCreateActivity)) data: TActivityRequest
  ) {
    return await this.activityService.create(data);
  }
}