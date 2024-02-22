import { Controller } from '@nestjs/common';

import { ActivityService } from '../services';

@Controller()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
}
