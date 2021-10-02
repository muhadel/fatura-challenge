import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserService } from '../modules/user/user.service';
import { RevokedTokenService } from '../modules/revoked-token/revoked-token.service';
import { JwtPayload } from '../types/jwt-payload';
import { jwtConfig } from '../config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly revokedTokenService: RevokedTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload, done: VerifiedCallback) {
    // Check if JWT is revoked
    const authHeader = req.headers['authorization'];
    const jwtFromHeader = authHeader.split(' ')[1];
    const isTokenRevoked = await this.revokedTokenService.getRevokedToken(jwtFromHeader);

    if (isTokenRevoked) {
      return done(new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED), false);
    }

    const user = await this.userService.findOne({ username: payload.username }, { username: 1, name: 1 });
    if (!user) {
      return done(new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED), false);
    }
    return done(null, user, payload.iat);
  }
}
