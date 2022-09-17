import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { WsServer } from './ws.server';

@Module({
  controllers: [SocketController],
  providers: [WsServer]
})
export class SocketModule {}
