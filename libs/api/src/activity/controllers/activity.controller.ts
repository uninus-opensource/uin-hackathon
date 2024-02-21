import { Controller, Get } from '@nestjs/common';

import { ActivityService } from '../services';

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  getData() {
    return this.activityService.getData();
  }
}
