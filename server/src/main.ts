import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { cookieConstants } from './auth/constants';
import Redis from 'ioredis';
import { redisConfig } from './auth/constants';

const redisClient = new Redis(redisConfig);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RedisStore = require('connect-redis').default;

const redisStore = new RedisStore({
  client: redisClient,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'verbose'],
  });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [`http://localhost:5173`],
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  app.use(cookieParser());

  app.use(
    session({
      store: redisStore,
      secret: cookieConstants.secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // true시 https에서만 작동
        maxAge: 60000,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
