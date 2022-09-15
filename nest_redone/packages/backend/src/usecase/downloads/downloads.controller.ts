import {
  Controller,
  Get,
  Res,
  UseGuards,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { LoggingDecorator } from 'src/common/handlers/decorators/logging.decorator';
import { LoggingGuard } from 'src/common/handlers/guards/logging.guard';
import { LoggingInterceptor } from 'src/common/handlers/interceptors/logging.interceptor';
import { DownloadsUsecase } from './downloads.usecase';

@UseGuards(LoggingGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('/')
export class DownloadsController {
  constructor(private readonly usecase: DownloadsUsecase) {}

  @Get('handlers')
  async execute(@Res() res: Response) {
    const result = await this.usecase.execute();

    return result;
  }
}
