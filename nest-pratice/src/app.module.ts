import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { config } from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.maria.host,
      port: config.maria.port,
      username: config.maria.user,
      password: config.maria.password,
      database: config.maria.db,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Board]),
    CacheModule.register({
      store: redisStore,
      host: config.redis.host,
      port: config.redis.port,
      ttl: config.redis.ttl,
    }),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class AppModule {}
