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

@Controller()
@UseGuards(AccessGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.activityService.findOne(id);
  }

  @Get()
  async findMany(@Query() request: any) {
    return await this.activityService.findMany(request);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.activityService.delete(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: any) {
    return await this.activityService.update({ id, ...data });
  }

  @Post()
  async create(@Body() data: any) {
    return await this.activityService.create(data);
  }
}
