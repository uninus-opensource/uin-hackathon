import { Controller } from '@nestjs/common';
import { CMSService } from '../services';

@Controller()
export class CMSController {
  constructor(private readonly cmsService: CMSService) {}
}
