import { Module } from '@nestjs/common';
import { MathController } from './math.controller';
import { MathUsecase } from './math.usecase';

@Module({
  controllers: [MathController],
  providers: [MathUsecase],
})
export class MathModule {}
