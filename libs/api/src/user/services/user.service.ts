import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
