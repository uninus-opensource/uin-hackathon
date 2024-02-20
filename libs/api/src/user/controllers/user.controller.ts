import { Controller, Get } from '@nestjs/common';

import { UserService } from '..';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getData() {
    return this.userService.getData();
  }
}
