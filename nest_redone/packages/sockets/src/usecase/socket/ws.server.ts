import { OnApplicationBootstrap } from '@nestjs/common';
import { IncomingMessage } from 'http';
import { WebSocketServer, WebSocket, Server} from 'ws';
import { MessageDto } from './ws.interface';

export class WsServer implements OnApplicationBootstrap {
  private server: Server<WebSocket>

  private clientsMap: Map<string, WebSocket>;

  constructor() {
    console.log('server is upppp');
  }

  onApplicationBootstrap() {
    
    this.server = new WebSocketServer({
      port: 8080,
      perMessageDeflate: {
        zlibDeflateOptions: {
          // See zlib defaults.
          chunkSize: 1024,
          memLevel: 7,
          level: 3
        },
        zlibInflateOptions: {
          chunkSize: 10 * 1024
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024 // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
      }
    })

    this.server.on('connection', (client: WebSocket, req: IncomingMessage ) => {
      this.clientsMap.set(req.socket.remoteAddress, client)

      client.on('close', () => {
        this.clientsMap.delete(req.socket.remoteAddress);

        client.send('closed');
      })
    });

  }

  emitMessage(ip: string, message: MessageDto) {
    const socket = this.clientsMap.get(ip)

    socket.send(message);
  }
}
