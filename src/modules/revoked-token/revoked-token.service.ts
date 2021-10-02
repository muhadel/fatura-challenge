import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RevokedTokenRepository } from './revoked-token.repository';
import { JwtPayload } from '../../types/jwt-payload';
import { RevokedToken } from '../../types/revoked-token';
import jwt_decode from 'jwt-decode';

@Injectable()
export class RevokedTokenService {
  constructor(
    private readonly revokedTokenRepository: RevokedTokenRepository,
  ) {}

  async revokeToken(token: string): Promise<RevokedToken> {
    const { id, exp }: JwtPayload = jwt_decode(token);
    const isTokenExists = await this.getRevokedToken(token)
    if (isTokenExists) {
      throw new HttpException('Token already revoked', HttpStatus.CONFLICT);
    }
    // create new revoked token
    return await this.revokedTokenRepository.create({ token, expireIn: exp, user: id });
  }


  async getRevokedToken(token: string): Promise<RevokedToken> {
    return await this.revokedTokenRepository.findOne({ token });
  }
}
