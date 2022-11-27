import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class GetMetaDecorator implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const meta = this.reflector.get('with-meta', context.getHandler());
    const meta2 = this.reflector.get('with-meta', context.getClass());

    console.log(23123, meta);
    console.log(7777, meta2);

    return true;
  }
}
