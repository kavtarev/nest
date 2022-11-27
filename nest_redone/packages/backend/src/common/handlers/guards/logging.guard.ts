import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Storage } from '../storage';

@Injectable()
export class LoggingGuard implements CanActivate {
  logger = new Logger();
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log('we are in logger guard');
    console.log(Storage.getTitle(context.switchToHttp().getRequest()));

    return true;
  }
}
