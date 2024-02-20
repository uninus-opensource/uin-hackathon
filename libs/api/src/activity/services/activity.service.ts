import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
