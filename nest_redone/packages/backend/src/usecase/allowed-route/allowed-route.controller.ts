import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IHttpService } from '../../modules/http-module/http-service.interface';
import { HTTP_SERVICE } from '../../modules/http-module/constants';
import { AllowedRouteUsecase } from './allowed-route.usecase';

@Controller('/')
export class AllowedRouteController {
  constructor(
    @Inject(HTTP_SERVICE)
    private readonly httpService: IHttpService,
    private readonly usecase: AllowedRouteUsecase,
  ) {}

  @Get('pes')
  async getMe(@Query('name') name: string) {
    const result = await this.usecase.echo(JSON.stringify(name));
    const awayResult = await this.httpService.get('todos/1');

    return { result, awayResult };
  }
}
