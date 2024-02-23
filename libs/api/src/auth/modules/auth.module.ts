import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../services';
import { AuthController } from '../controllers';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env['ACCESS_SECRET'],
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
