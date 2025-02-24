import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  maria: {
    host: process.env.MARIA_HOST,
    db: process.env.MARIA_DB,
    user: process.env.MARIA_USER,
    password: process.env.MARIA_PASS,
    port: Number(process.env.MARIA_PORT),
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    ttl: Number(process.env.REDIS_TTL),
  },
};
