import { Controller, Get } from '@nestjs/common';

import { ActivityService } from '..';

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  getData() {
    return this.activityService.getData();
  }
}
