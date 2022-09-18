import {
  Controller,
  Get,
  Res,
  StreamableFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingGuard } from 'src/common/handlers/guards/logging.guard';
import { LoggingInterceptor } from 'src/common/handlers/interceptors/logging.interceptor';
import { XlxsIntercerptor } from 'src/common/handlers/interceptors/xslxs.intercerptor';
import { DownloadsUsecase } from './downloads.usecase';

import * as XLXS from 'xlsx';

@UseGuards(LoggingGuard)
// @UseInterceptors(XlxsIntercerptor)
@Controller('/')
export class DownloadsController {
  constructor(private readonly usecase: DownloadsUsecase) {}

  @Get('handlers')
  async execute() {
    const result = await this.usecase.execute();

    const book = XLXS.utils.book_new();
    const sheet = XLXS.utils.json_to_sheet([result]);
    const name = 'NAME';
    XLXS.utils.book_append_sheet(book, sheet);

    const buffer = XLXS.write(book, { type: 'buffer' });

    return new StreamableFile(buffer, {
      disposition: `attachment; filename="${name}.xlsx"`,
      length: buffer.length,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }
}
