import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupReqDto {
  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  username: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z])).*$/, {
    message: `Password is too weak!`,
  })
  @ApiProperty()
  password: string;
}
