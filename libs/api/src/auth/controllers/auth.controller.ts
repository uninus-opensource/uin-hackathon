import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from '../services';
import { TLoginRequest, TRegisterRequest } from '@psu/entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() request: TLoginRequest) {
    return await this.authService.login(request);
  }

  @Post('/register')
  async register(@Body() request: TRegisterRequest) {
    return await this.authService.register(request);
  }
}
