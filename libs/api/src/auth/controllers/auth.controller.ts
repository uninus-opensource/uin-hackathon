import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services';
import { TLoginRequest, TRegisterRequest, THeaderRequest } from '@psu/entities';
import { GoogleGuard, RefreshGuard } from '../../common/guards';

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

  @Post('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Request() request: THeaderRequest) {
    return await this.authService.refresh(request.user);
  }

  @Get('/google')
  @UseGuards(GoogleGuard)
  async google(@Request() request: THeaderRequest) {
    return await this.authService.google(request.user);
  }
}
