import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { redisConfig } from 'src/auth/constants';

export type RedisClient = Redis;

export const redisProvider: Provider = {
  useFactory: (): RedisClient => {
    return new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
    });
  },
  provide: 'REDIS_CLIENT',
};
