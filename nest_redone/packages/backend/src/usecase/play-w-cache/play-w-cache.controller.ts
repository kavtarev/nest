import {
  CACHE_MANAGER,
  Controller,
  Inject,
  Post,
  Request,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Controller()
export class PlayWCacheController {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  @Post('play-w-cache')
  async execute(@Request() req: Request) {
    console.log(req.cache);
    console.log(req.headers);
    return 34;

    // const result = await this.cache.get('boobs');

    // if (!result) {
    //   await this.cache.set('boobs', 'boobs');
    //   const re = await this.cache.get('boobs');
    //   return re + '66';
    // }

    // return result;
  }
}
