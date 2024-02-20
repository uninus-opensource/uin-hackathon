import { Controller, Get } from '@nestjs/common';

import { AuthService } from '..';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getData() {
    return this.authService.getData();
  }
}
