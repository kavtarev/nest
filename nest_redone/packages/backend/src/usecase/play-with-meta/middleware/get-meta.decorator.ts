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

    // console.log(23123, meta);
    // console.log(7777, meta2);

    return true;
  }
  execute() {
    // const get = this.reflector.get();
    // const getAll = this.reflector.getAll();
    // const getAllAndMerge = this.reflector.getAllAndMerge();
    // const getAllAndOverride = this.reflector.getAllAndOverride();

    // console.log(this.reflector.get('g', 'g'));
    const a = Reflect.getMetadata('hui', this);

    console.log(123, this);
  }
}
