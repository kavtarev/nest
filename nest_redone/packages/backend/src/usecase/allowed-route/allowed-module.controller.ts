import { Controller, Get, Query } from '@nestjs/common';
import { RequireAuth } from 'src/core/user/user.guard';
import { AllowedUsecase } from './allowed-route.usecase';
import { right } from '../../../../common/dist/either';

import { Either } from '../../../../common/helpers/either';

@Controller('/')
export class AllowedController {
  constructor(private readonly usecase: AllowedUsecase) {}

  // @RequireAuth()
  @Get('pes')
  async getMe(@Query('name') name: string): Promise<Either<any, any>> {
    const result = await this.usecase.echo(JSON.stringify(name));
    return right({ name: 1 });
  }

  sayHi() {
    console.log(88);
  }
}
