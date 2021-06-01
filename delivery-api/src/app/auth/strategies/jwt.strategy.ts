import environment from '@/environment';
import { UsersService } from '@/services';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.jwt.secretKey,
    });
  }

  async validate(payload) {
    const { _id, token } = payload;

    const user = await this.usersService.findByToken(token);
    if (!user || user._id.toString() !== _id) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
