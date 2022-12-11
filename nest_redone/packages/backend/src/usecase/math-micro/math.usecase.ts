import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
  TcpClientOptions,
} from '@nestjs/microservices';
@Injectable()
export class MathUsecase {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'backend_sockets',
        port: 3101,
      },
    });
  }

  async execute(dto: number[]) {
    const boob = this.client
      .send<number, number[]>('sum', dto)
      .subscribe((res) => console.log(res));

    return 89;
  }
}
