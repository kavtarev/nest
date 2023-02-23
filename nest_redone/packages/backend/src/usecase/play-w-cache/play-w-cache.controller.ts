import { CACHE_MANAGER, Controller, Inject, Post } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller()
export class PlayWCacheController {
  constructor(@Inject(CACHE_MANAGER)private readonly cache: Cache) {}

  @Post('play-w-cache')
  async execute() {
    const result = await this.cache.get('boob');

    if (!result) {
      await this.cache.set('boob', 'boob')
      return 'boob set';
    }

    return result;
  }
}
