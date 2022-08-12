import { Body, Controller, Post } from '@nestjs/common';
import { MathUsecase } from './math.usecase';

@Controller()
export class MathController {
  constructor(private usecase: MathUsecase) {}
  @Post('math')
  async sum(@Body() dto: { body: number[] }) {
    console.log('here');
    
    const data = await this.usecase.execute(dto.body);

    return data;
  }
}
