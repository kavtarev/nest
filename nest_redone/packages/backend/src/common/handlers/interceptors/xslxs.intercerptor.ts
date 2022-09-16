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
export class XslxsIntercerptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('we are in interceptor');

    const response: any = context.switchToHttp().getResponse();
    // this.logger.warn(123, response.locals);

    return next.handle().pipe(
      map((response) => {
        console.log(response);
        
        this.hui(response);
      }),
    );
  }

  hui(hui: any) {
    const book = XLXS.utils.book_new();
    const sheet = XLXS.utils.json_to_sheet([hui]);
    const name = 'NAME'
    XLXS.utils.book_append_sheet(book, sheet);

    const buffer = XLXS.write(book, { type: 'buffer' });

    return new StreamableFile(buffer, {
      disposition: `attachment; filename="${name}.xlsx"`,
      length: buffer.length,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  }
}
