import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
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
  TForgotPasswordRequest,
  TResetPasswordRequest,
} from '@psu/entities';
import {
  AccessGuard,
  GoogleGuard,
  QueryGuard,
  RefreshGuard,
} from '../../common/guards';
import { ZodValidationPipe } from '../../common/pipes/';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import {
  ForgotPasswordDto,
  LoginDto,
  RefreshDto,
  RegisterDto,
  ResetPasswordDto,
} from '../../common';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('callback')
  @UseGuards(QueryGuard)
  @Redirect(`${process.env['REDIRECT_FE_URL']}/auth/login`, 302)
  async callback(@Request() request: THeaderRequest) {
    return await this.authService.callback(request.user.sub);
  }

  @Get('/google')
  @UseGuards(GoogleGuard)
  async google(@Request() request: THeaderRequest) {
    return await this.authService.google(request.user);
  }

  @ApiBody({ type: LoginDto })
  @Post('/login')
  async login(@Body(new ZodValidationPipe(VSLogin)) request: TLoginRequest) {
    return await this.authService.login(request);
  }

  @ApiBody({ type: RegisterDto })
  @Post('/register')
  async register(
    @Body(new ZodValidationPipe(VSRegister)) request: TRegisterRequest
  ) {
    return await this.authService.register(request);
  }

  @ApiBody({ type: RefreshDto })
  @Post('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Request() request: THeaderRequest) {
    return await this.authService.refresh(request.user);
  }

  @ApiBody({ type: ForgotPasswordDto })
  @Post('/password/forgot')
  async forgotPassword(@Body() data: TForgotPasswordRequest) {
    return await this.authService.forgotPassword(data.email);
  }

  @ApiBody({ type: ResetPasswordDto })
  @Post('/password/reset')
  @UseGuards(AccessGuard)
  async resetPassword(
    @Request() request: THeaderRequest,
    @Body() data: TResetPasswordRequest
  ) {
    return await this.authService.resetPassword({
      id: request.user.sub,
      ...data,
    });
  }
}
