import { Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export class TestEvent {
  num = 10;

  constructor(add: number) {
    this.num += add;
  }

  sayNum() {
    console.log(this.num);
  }

  setNum(num: number) {
    this.num += num;
  }
}

@Controller()
export class SendEventsController {
  constructor(private client: EventEmitter2) {}

  @Post('send-event')
  execute() {
    console.log('init');

    this.client.emit('test-event', new TestEvent(55));

    console.log('finish');
  }
}
