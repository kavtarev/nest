import { Controller } from '@nestjs/common';
import { Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';

@Controller()
export class MathController {
  @MessagePattern('sum')
  async sum(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(data);
    console.log(   '    context.getPattern()', context.getPattern())
    console.log(   '    context.args()', context.getArgs())
    console.log(   '    context.channel()', context.getChannelRef())
    console.log(   '    context.message()', context.getMessage())
    
    return 56;
  }
}