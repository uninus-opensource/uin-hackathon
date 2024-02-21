import { Controller, Get } from '@nestjs/common';

import { UserService } from '../services';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getData() {
    return this.userService.getData();
  }
}
