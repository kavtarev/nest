import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()

export class MathController {
  @MessagePattern('sum')
  async sum() {
    return 56;
  }
}