import { Controller, Get, Query } from '@nestjs/common';
import { RequireAuth } from 'src/core/user/user.guard';
import { AllowedUsecase } from './allowed-route.usecase';

@Controller('/')
export class AllowedController {
  constructor(private readonly usecase: AllowedUsecase) {}

  @RequireAuth()
  @Get('pes')
  async getMe(@Query('name') name: string) {
    const result = await this.usecase.echo(JSON.stringify(name));
    return result;
  }
}
