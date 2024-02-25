import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services';
import {
  TLoginRequest,
  TRegisterRequest,
  THeaderRequest,
  VSLogin,
  VSRegister,
} from '@psu/entities';
import { GoogleGuard, RefreshGuard } from '../../common/guards';
import { ZodValidationPipe } from '../../common/pipes/zod.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body(new ZodValidationPipe(VSLogin)) request: TLoginRequest) {
    return await this.authService.login(request);
  }

  @Post('/register')
  async register(
    @Body(new ZodValidationPipe(VSRegister)) request: TRegisterRequest
  ) {
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
