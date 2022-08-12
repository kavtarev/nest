import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MathModule } from './usecase/math.module';

export const baseProviders = [{ provide: APP_PIPE, useClass: ValidationPipe }];

@Module({
  providers: [...baseProviders],
  imports: [MathModule]
})
export class AppModule {}
