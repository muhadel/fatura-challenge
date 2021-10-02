import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RevokedTokenService } from '../revoked-token/revoked-token.service';
import {
  SignupReqDto,
  SignupResDto,
  SigninReqDto,
  SigninResDto,
  RevokeTokenReqDto,
  RevokeTokenResDto,
} from './dto';
import { GetUser } from '../../decorators/user.decorator';

import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from '../../decorators/role.decorator';
import { RolesGuard } from '../../guards/role.guard';
import { EAction, EResource } from '../../types/role';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly revokedTokenService: RevokedTokenService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Signup' })
  signup(@Body() signupDto: SignupReqDto): Promise<SignupResDto> {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Signin' })
  signin(@Body() signinDto: SigninReqDto): Promise<SigninResDto> {
    return this.authService.signin(signinDto);
  }

  @Post('revoke-token')
  @ApiOperation({ summary: 'This endpoint require authentication & authorization' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Roles([EAction.MANAGE], EResource.AUTH)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async revokeToken( @Body() { token }: RevokeTokenReqDto): Promise<RevokeTokenResDto> {
    const revokedToken = await this.revokedTokenService.revokeToken(token);
    return { message: 'Token revoked.', data: revokedToken };
  }

  @Get('protected')
  @ApiOperation({ summary: 'This endpoint require authentication & authorization' })
  @ApiBearerAuth()
  @Roles([EAction.MANAGE, EAction.CREATE], EResource.AUTH)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  protected(@GetUser() user: any): any {
    return {
      // Just for testing purpose
      message: 'This endpoint is protected by 2 guards (JWT & Permissions)',
    };
  }
}
