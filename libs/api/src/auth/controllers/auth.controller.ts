import { Controller, Get } from '@nestjs/common';

import { AuthService } from '../services';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getData() {
    return;
  }
}
