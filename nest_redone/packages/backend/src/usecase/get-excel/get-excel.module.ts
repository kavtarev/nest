import { Module } from '@nestjs/common';
import { GetExcelController } from './get-excel.controller';
import { GetExcelUsecase } from './get-excel.usecase';

@Module({
  providers: [GetExcelUsecase],
  controllers: [GetExcelController],
})
export class GetExcelModule {}
