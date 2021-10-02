import { IsString, IsDefined, IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RevokeTokenReqDto {
  @IsString()
  @IsDefined()
  @IsJWT()
  @ApiProperty()
  token: string;
}
