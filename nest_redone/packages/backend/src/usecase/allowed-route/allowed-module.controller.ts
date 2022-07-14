import { HTTP_SERVICE } from './../../modules/http-module/constants';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { RequireAuth } from 'src/core/user/user.guard';
import { IHttpService } from 'src/modules/http-module/http-service.interface';
import { AllowedUsecase } from './allowed-route.usecase';
import { right } from '../../../../common/dist/either';

import { Either } from '../../../../common/helpers/either';

@Controller('/')
export class AllowedController {
  constructor(
    @Inject(HTTP_SERVICE)
    private readonly httpService: IHttpService,
    private readonly usecase: AllowedUsecase,
  ) {}

  // @RequireAuth()
  @Get('pes')
  async getMe(@Query('name') name: string) {
    // const result = await this.usecase.echo(JSON.stringify(name));
    const result = await this.httpService.get('todos/1');
    return result;
  }
}
