import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { cookieConstants, jwtConstants } from './constants';
import { UserService } from 'src/user/user.service';
import cookieParser from 'cookie-parser';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new BadRequestException('토큰이 존재하지 않습니다');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      const userId = payload['sub'];
      const username = payload['username'];

      const user = await this.userService.findOneByUserId(userId);
      if (user === undefined || user.username !== username) {
        throw new Error('로그인되지 않은 유저입니다');
      }
      request['user'] = {
        userId: user.userId,
        username: user.username,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sid = this.extractSidFromCookie(request);
    if (!sid) {
      throw new BadRequestException('쿠키가 존재하지 않습니다');
    }
    try {
      const sidParsed = cookieParser.signedCookie(sid, cookieConstants.secret);
      const result = await this.redisService.get(`sess:${sidParsed}`);

      const sessionData = JSON.parse(result);
      const userId = sessionData['userId'];

      const user = await this.userService.findOneByUserId(userId);
      if (user === undefined) {
        throw new Error('로그인되지 않은 유저입니다.');
      }

      request['user'] = {
        userId: user.userId,
        username: user.username,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return true;
  }

  private extractSidFromCookie(request: Request): string | undefined {
    return request['cookies']['connect.sid'];
  }
}
