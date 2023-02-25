import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetTokenCookieDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const token = request.headers.cookie.split('=')[1];

    return token;
  },
);
