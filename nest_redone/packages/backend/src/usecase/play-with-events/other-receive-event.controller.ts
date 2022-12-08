import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Payload } from '@nestjs/microservices';
import { TestEvent } from './send-events.controller';

@Controller()
export class OtherReceiveEventController {
  @OnEvent('test-event')
  execute(@Payload() data: TestEvent) {
    data.setNum(1);
    console.log('OtherReceiveEventController', data.num);
  }
}
