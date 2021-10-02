import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignupReqDto, SignupResDto, SigninReqDto, SigninResDto } from './dto';

@Injectable()
export class AuthService {
  private static readonly tokenType = 'Bearer';
  constructor(private readonly userService: UserService) {}

  async signup(signupDto: SignupReqDto): Promise<SignupResDto> {
    const { username } = signupDto;
    const isUsernameFound = await this.userService.findOne({ username });
    if (isUsernameFound) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    // Create User
    const userCreated = await this.userService.create(signupDto);

    return {
      message: 'Successfully created',
      data: {
        _id: userCreated._id,
        name: userCreated.name,
        username: userCreated.username,
      },
    };
  }

  async signin(signinDto: SigninReqDto): Promise<SigninResDto> {
    const { username } = signinDto;
    const user = await this.userService.findOne({ username });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const isPasswordValid = user.validatePassword(signinDto.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = user.generateAuthToken();
    return { tokenType: AuthService.tokenType, accessToken };
  }
}
