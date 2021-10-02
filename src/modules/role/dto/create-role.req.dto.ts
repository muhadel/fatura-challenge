import { IsString, IsDefined, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EResource, EAction } from '../../../types/role';

const ACTIONS_AVAILABLE = `${EAction.MANAGE} - ${EAction.CREATE} - ${EAction.READ} - ${EAction.UPDATE} - ${EAction.DELETE}`;
const RESOURCE_AVAILABLE = `${EResource.ROLE}`;

export class CreateRoleReqDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  name: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  @IsEnum(EResource, {
    message: `Resource shoud be one of [${RESOURCE_AVAILABLE}]`,
  })
  resource: string;

  @ApiProperty({ description: ACTIONS_AVAILABLE, isArray: true, enum: EAction })
  @IsEnum(EAction, {
    each: true,
    message: `Actions shoud be one of [${ACTIONS_AVAILABLE}]`,
  })
  actions: EAction[];
}
