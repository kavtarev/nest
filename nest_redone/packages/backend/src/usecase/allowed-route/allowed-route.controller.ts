import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { HTTP_SERVICE } from '../../modules/http-module/constants';
import { IHttpService } from '../../modules/http-module/http-service.interface';
import { AllowedRouteUsecase } from './allowed-route.usecase';

@Controller('/')
export class AllowedRouteController {
  constructor(
    @Inject(HTTP_SERVICE)
    private readonly httpService: IHttpService,
    private readonly usecase: AllowedRouteUsecase,
  ) {}

  @Get('pes')
  async getMe(@Query('name') name: string, @Req() req: Request) {
    const result = await this.usecase.echo(JSON.stringify(name));
    const awayResult = await this.httpService.get('todos/1');

    console.log(23, req.cookies);
    return { result, awayResult };
  }
}
