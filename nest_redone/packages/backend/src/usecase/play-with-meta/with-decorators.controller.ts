import { Controller, Post, UseGuards } from '@nestjs/common';
import { FindByMeta } from './find-by-meta';
import { ContextGuard } from './middleware/context-guard';
import { GetMetaDecorator } from './middleware/get-meta.decorator';
import { SetMetaDecorator } from './middleware/set-meta.decorator';

@Controller()
@SetMetaDecorator('with-meta')
export class WithDecoratorsController {
  constructor(
    private readonly getMeta: GetMetaDecorator,
    private readonly findByMeta: FindByMeta,
  ) {}
  @Post('with-decorator')
  @SetMetaDecorator('with-meta')
  @UseGuards(ContextGuard)
  @UseGuards(GetMetaDecorator)
  async execute() {
    const meta = Reflect.getMetadata('with-meta', this['execute']);
    this.findByMeta.find('hui');

    // Reflect.defineMetadata('name', 'hui', this);
    // console.log(1111, Reflect.ownKeys(this));
    // console.log(3333, Reflect.getMetadataKeys(this));

    // const res = this.getMeta.execute();

    // console.log({ meta });

    return meta;
  }
}
