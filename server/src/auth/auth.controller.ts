import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, RegisterDto } from './dto/auth.dto';
import { SessionGuard, TokenGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login/session')
  async signInBySession(@Req() req: Request, @Body() signInDto: SignInDto) {
    const result = await this.authService.signInBySession(signInDto);
    req.session.userId = result.userId;
    return true;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login/token')
  async signInByToken(@Body() signInDto: SignInDto) {
    const result = await this.authService.signInByToken(signInDto);
    return result;
  }

  @Post('logout')
  async signOut(@Req() req: Request): Promise<boolean> {
    req.session.destroy((err) => new BadRequestException(err.message));
    return true;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(TokenGuard)
  @Get('profile/token')
  getProfileByToken(@Req() req: Request) {
    return req['user'];
  }

  @UseGuards(SessionGuard)
  @Get('profile/session')
  getProfileBySession(@Req() req: Request) {
    return req['user'];
  }
}
