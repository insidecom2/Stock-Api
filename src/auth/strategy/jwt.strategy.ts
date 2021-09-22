import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly reflector: Reflector,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const checkToken: any = this.usersService.findOneByEmail(payload.email);
    if (!checkToken) return false;
    return {
      email: payload.email,
      role: payload.role,
      id: payload.id,
    };
  }
}
