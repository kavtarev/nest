import { Controller } from '@nestjs/common';
import { Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';

@Controller()
export class MathController {
  @MessagePattern('sum')
  async sum(@Payload() data: number[], @Ctx() context: RmqContext) {

    const channel = context.getChannelRef()
    channel.ack(context.getMessage())
    
    console.log(data);
    
    return 56;
  }
}