import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import {
  UserModule,
  DrizzleModule,
  AccessStrategy,
  RefreshStrategy,
  GoogleStrategy,
  ActivityModule,
  AuthModule,
  EmailModule,
  FileModule,
  OgranizationModule,
  RoleModule,
  DepartmentModule,
  FacultyModule,
} from '@psu/api';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'access',
    }),
    AuthModule,
    UserModule,
    ActivityModule,
    OgranizationModule,
    DrizzleModule,
    EmailModule,
    RoleModule,
    DepartmentModule,
    FacultyModule,
    FileModule,
  ],
  controllers: [],
  providers: [AccessStrategy, RefreshStrategy, GoogleStrategy],
})
export class AppModule {}
