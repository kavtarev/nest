import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('we are in interceptor');

    const response: any = context.switchToHttp().getResponse();
    // this.logger.warn(123, response.locals);

    return next.handle().pipe(tap());
  }
}
