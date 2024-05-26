export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export const cookieConstants = {
  secret: 'login-test',
};

export const redisConfig: { host: string; port: number } = {
  host: 'localhost',
  port: 6379,
};
