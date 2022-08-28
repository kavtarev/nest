import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MathUsecase {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'main',
        queueOptions: {
          durable: false,
        },
        noAck: false,
      },
    });
  }

  async execute(dto: number[]) {
    return this.client.send('sum', dto);
  }
}
