import { Body, Controller, Post } from '@nestjs/common';
import { FindUserUsecase } from './find-user.usecase';

@Controller()
export class FindUserController {
  constructor(private readonly usecase: FindUserUsecase) {}
  @Post('find-user')
  async execute(@Body() dto: { id: string }) {
    const result = await this.usecase.execute(dto.id);

    return result;
  }
}
