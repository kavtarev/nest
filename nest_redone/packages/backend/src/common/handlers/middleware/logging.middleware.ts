import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Storage } from '../storage';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('we are in middleware');
    console.error(Storage.getTitle(req));

    Storage.setTitle(req, 'middleware');
    res.locals = { hui: 56 };
    next();
  }
}
