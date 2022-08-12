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
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3100,
      },
    });
  }

  async execute(dto: number[]) {
    return this.client.send('sum', dto);
  }
}
