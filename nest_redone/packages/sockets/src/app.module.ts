import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

export const baseProviders = [{ provide: APP_PIPE, useClass: ValidationPipe }];
@Module({
  providers: [...baseProviders],
})
export class AppModule {}
