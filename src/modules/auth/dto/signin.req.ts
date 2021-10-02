import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninReqDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z])).*$/, {
    message: `Password is too weak!`,
  })
  @IsDefined()
  @ApiProperty()
  password: string;
}
