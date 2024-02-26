import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services';
import { AuthController } from '../controllers';
import { EmailModule, EmailService } from '../../email';
import { UserModule, UserService } from '../../user';

@Module({
  imports: [
    EmailModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env['ACCESS_SECRET'],
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, UserService],
})
export class AuthModule {}
