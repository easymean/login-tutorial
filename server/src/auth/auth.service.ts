import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto, SignInDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signOut() {
    return true;
  }

  async register(registerDto: RegisterDto) {
    return await this.userService.create(registerDto);
  }

  async signInByToken(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByUsername(signInDto.username);
    if (user?.password !== signInDto.password) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }
    const payload = {
      sub: user.userId,
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signInBySession(signInDto: SignInDto) {
    const user = await this.userService.findOneByUsername(signInDto.username);
    if (user?.password !== signInDto.password) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }
    const { password, ...result } = user;

    return result;
  }
}
