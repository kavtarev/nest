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
      transport: Transport.TCP,
      options: {
        host: 'backend_sockets',
        port: 3101,
      },
    });
  }

  async execute(dto: number[]) {
    console.log('in execute');
    
    return this.client.send('sum', dto);
  }
}
