import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as XLXS from 'xlsx';

@Injectable()
export class XlxsInterceptor implements NestInterceptor {
  private readonly logger = new Logger(XlxsInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('we are in interceptor');

    return next.handle().pipe(
      map((response) => {
        return this.createStream(response);
      }),
    );
  }

  createStream(response: any) {
    const book = XLXS.utils.book_new();
    const sheet = XLXS.utils.json_to_sheet([response]);
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
