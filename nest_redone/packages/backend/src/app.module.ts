import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { LoggingMiddleware } from './common/handlers/middleware/logging.middleware';
import { ConfigurationModule } from './modules/config/config.module';
import { DatabaseModule } from './modules/database/database.module';
import { AllowedRouteModule } from './usecase/allowed-route/allowed-route.module';
import { DownloadFileController } from './usecase/download-file/download-file.controller';
import { FindUserModule } from './usecase/find-user/find-user.module';
import { GetExcelModule } from './usecase/get-excel/get-excel.module';
import { MathModule } from './usecase/math-micro/math.module';
import { PlayWCacheController } from './usecase/play-w-cache/play-w-cache.controller';
import { SendEventsModule } from './usecase/play-with-events/send-events.module';
import { PlayWithMetaModule } from './usecase/play-with-meta/play-with-meta.module';
import { RegistrationModule } from './usecase/registration/registration.module';
import { RequestHandlersPlaygroundController } from './usecase/request-handlers-playground/request-handlers-playground.controller';
import { RequestHandlersPlaygroundModule } from './usecase/request-handlers-playground/request-handlers-playground.module';
import { UploadDownloadStreamsModule } from './usecase/upload-download-streams/upload-download-streams.module';

export const baseModules = [ConfigurationModule, DatabaseModule];
export const baseProviders = [{ provide: APP_PIPE, useClass: ValidationPipe }];

import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { AuthModule } from './core/auth/auth.module';
import { TokenEntity } from './core/token/token.entity';
import { TokenRepository } from './core/token/token.repository';
import { UserEntity } from './core/user/user.entity';
import { UserRepository } from './core/user/user.repo';
import { LoginController } from './usecase/login/login.controller';
import { RefreshModule } from './usecase/refresh/refresh.module';
@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'redis',
            port: 6379,
          },
          ttl: 100,
        });

        return {
          store: () => store,
        };
      },
    }),
    ...baseModules,
    AllowedRouteModule,
    RegistrationModule,
    MathModule,
    GetExcelModule,
    FindUserModule,
    UploadDownloadStreamsModule,
    RequestHandlersPlaygroundModule,
    PlayWithMetaModule,
    SendEventsModule,
    AuthModule,
    RefreshModule,
    TypeOrmModule.forFeature([UserEntity, TokenEntity]),
  ],
  providers: [...baseProviders, UserRepository, TokenRepository],
  controllers: [DownloadFileController, PlayWCacheController, LoginController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes(RequestHandlersPlaygroundController);
  }
}
