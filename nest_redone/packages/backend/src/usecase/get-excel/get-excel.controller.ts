import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { XlxsInterceptor } from 'src/common/handlers/interceptors/xlxs.interceptor';
import { GetExcelUsecase } from './get-excel.usecase';

@UseInterceptors(XlxsInterceptor)
@Controller('/')
export class GetExcelController {
  constructor(private readonly usecase: GetExcelUsecase) {}

  @Get('get-excel')
  async execute() {
    const result = await this.usecase.execute();

    return result;
  }
}
