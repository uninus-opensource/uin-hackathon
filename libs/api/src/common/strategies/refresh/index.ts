import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TJwtRequest } from '@psu/entities';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env['REFRESH_SECRET'],
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TJwtRequest) {
    const refreshToken = req;

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

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
