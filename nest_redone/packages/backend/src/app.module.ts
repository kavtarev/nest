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
import { AllowedModule } from './usecase/allowed-route/allowed-route.module';
import { DownloadsController } from './usecase/downloads/downloads.controller';
import { DownloadsModule } from './usecase/downloads/downloads.module';
import { FindUserModule } from './usecase/find-user/find-user.module';
import { MathModule } from './usecase/math-micro/math.module';
import { RegistrationModule } from './usecase/registration/registration.module';

export const baseModules = [ConfigurationModule, DatabaseModule];
export const baseProviders = [{ provide: APP_PIPE, useClass: ValidationPipe }];
@Module({
  imports: [
    ...baseModules,
    AllowedModule,
    RegistrationModule,
    MathModule,
    DownloadsModule,
    FindUserModule,
  ],
  providers: [...baseProviders],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes(DownloadsController);
  }
}
