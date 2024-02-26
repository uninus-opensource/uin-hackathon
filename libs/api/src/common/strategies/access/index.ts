import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TJwtRequest } from '@psu/entities';
@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['ACCESS_SECRET'],
    });
  }

  async validate(payload: TJwtRequest) {
    const {
      sub,
      email,
      fullname,
      organizationId,
      facultyId,
      departmentId,
      role,
    } = payload;
    return {
      sub,
      email,
      fullname,
      organizationId,
      facultyId,
      departmentId,
      role,
    };
  }
}
