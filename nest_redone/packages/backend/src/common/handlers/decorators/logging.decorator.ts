import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const LoggingDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const logger = new Logger();

    logger.warn('we are in decorator');
    return request.user;
  },
);
