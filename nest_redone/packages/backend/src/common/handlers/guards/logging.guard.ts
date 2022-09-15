import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingGuard implements CanActivate {
  logger = new Logger();
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    this.logger.log('we are in logger guard');

    return true;
  }
}
