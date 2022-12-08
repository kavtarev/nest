import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { OtherReceiveEventController } from './other-receive-event.controller';
import { ReceiveEventController } from './receive-event.controller';
import { SendEventsController } from './send-events.controller';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [
    SendEventsController,
    ReceiveEventController,
    OtherReceiveEventController,
  ],
})
export class SendEventsModule {}
