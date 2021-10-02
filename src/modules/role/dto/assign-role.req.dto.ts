import { IsString, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleReqDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  roleId: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  userId: string;
}
