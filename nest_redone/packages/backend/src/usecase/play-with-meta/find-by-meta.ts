import { Injectable } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { SetMetaDecorator } from './middleware/set-meta.decorator';

@Injectable()
@SetMetaDecorator('hui22')
export class FindByMeta {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}
  async find(metaName: string) {
    const providers = this.discovery.getProviders();

    providers.forEach(({ instance }) => {
      if (!instance || !Object.getPrototypeOf(instance)) {
        return;
      }

      const classMeta = this.reflector.get('hui22', instance.constructor);

      if (classMeta === true) {
        instance['hui']();
      }
      console.log(classMeta);
    });

    return 1;
  }

  reflect() {
    return Reflect.getMetadata('with-meta', this);
  }

  hui() {
    console.log('it`s alive');
  }
}
