import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from '../services';
import { AccessGuard } from '../../common';

@Controller()
@UseGuards(AccessGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/:id')
  async findOne() {
    return await this.activityService.findOne();
  }

  @Get()
  async findMany() {
    return await this.activityService.findMany();
  }

  @Delete('/:id')
  async delete() {
    return await this.activityService.delete();
  }

  @Patch('/:id')
  async update() {
    return await this.activityService.update();
  }

  @Post()
  async create() {
    return await this.activityService.create();
  }
}
