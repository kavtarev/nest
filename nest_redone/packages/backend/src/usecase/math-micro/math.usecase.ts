import { Injectable } from '@nestjs/common';
import {
  Client,
  ClientProxy,
  ClientProxyFactory,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MathUsecase {
  private client: ClientProxy;

  constructor() {
    console.log('usercaes');

    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'main',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  async execute(dto: number[]) {
    console.log('in execute');

    return this.client.send('sum', dto);
  }
}
