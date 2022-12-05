import {
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
import { GetExcelModule } from './usecase/get-excel/get-excel.module';
import { FindUserModule } from './usecase/find-user/find-user.module';
import { MathModule } from './usecase/math-micro/math.module';
import { RegistrationModule } from './usecase/registration/registration.module';
import { RequestHandlersPlaygroundController } from './usecase/request-handlers-playground/request-handlers-playground.controller';
import { RequestHandlersPlaygroundModule } from './usecase/request-handlers-playground/request-handlers-playground.module';
import { UploadDownloadStreamsModule } from './usecase/upload-download-streams/upload-download-streams.module';
import { PlayWithMetaModule } from './usecase/play-with-meta/play-with-meta.module';
import { DownloadFileController } from './usecase/download-file/download-file.controller';

export const baseModules = [ConfigurationModule, DatabaseModule];
export const baseProviders = [{ provide: APP_PIPE, useClass: ValidationPipe }];
@Module({
  imports: [
    ...baseModules,
    AllowedRouteModule,
    RegistrationModule,
    MathModule,
    GetExcelModule,
    FindUserModule,
    UploadDownloadStreamsModule,
    RequestHandlersPlaygroundModule,
    PlayWithMetaModule,
  ],
  providers: [...baseProviders],
  controllers: [DownloadFileController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes(RequestHandlersPlaygroundController);
  }
}
