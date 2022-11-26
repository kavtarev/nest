import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { FindByMeta } from './find-by-meta';
import { GetMetaDecorator } from './middleware/get-meta.decorator';
import { WithDecoratorsController } from './with-decorators.controller';

@Module({
  imports: [DiscoveryModule],
  controllers: [WithDecoratorsController],
  providers: [GetMetaDecorator, FindByMeta],
})
export class PlayWithMetaModule {}
