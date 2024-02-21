import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { TLoginRequest, TRegisterRequest, THeaderRequest } from '@psu/entities';
import { GoogleGuard } from '../../common/guards/google.guard';

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

  @Post('/google/login')
  @UseGuards(GoogleGuard)
  async googleLogin(@Request() request: THeaderRequest) {
    return await this.authService.googleLogin(request.user);
  }

  @Post('/google/register')
  @UseGuards(GoogleGuard)
  async googleRegister(@Request() request: THeaderRequest) {
    return await this.authService.googleRegister(request.user);
  }
}
