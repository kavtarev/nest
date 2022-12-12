import { createRoutesKey } from './common/create-routes.key.js';
import * as http from 'http';
import { Router } from './router';
import { EventEmitter } from 'events';

export class App {
  private emitter: EventEmitter;
  private server: http.Server;

  constructor() {
    this.emitter = new EventEmitter();
    this.server = http.createServer();
 
    this.server.on('request', async (req, res) => {
      let route = createRoutesKey(req.url, req.method)
      
      const result = this.emitter.emit(route, req, res)

      if(!result) {
        res.end('psina sutulaya')
      }
    })
  }

  get(path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    const route = createRoutesKey(path, 'GET');

    this.emitter.on(route, (req, res) => {
      handler(req, res)
    })
  }

  post(path: string, handler: (req: http.IncomingMessage, res: http.ServerResponse) => void) {
    const route = createRoutesKey(path, 'POST');

    this.emitter.on(route, (req, res) => {
      handler(req, res)
    })
  }

  addRouter(path: string = '/', router: Router) {
    this.checkEventsForDuplicates(path, router.getRoutes())
    this.addEventsFromRouter(path, router.getRoutes())
  }

  private checkEventsForDuplicates(path: string, routes: Map<string, (req, res,) => void>) {
    const pathes = [...routes.keys()].map(key => `${path}${key}`);
    const events = this.emitter.eventNames()

    for (let path of pathes) {
      if (events.includes(path)) {
        throw new Error(`Duplicate events: ${path} not allowed`)
      }
    }
  }

  private addEventsFromRouter(path: string, routes: Map<string, (req, res,) => void>) {
    routes.forEach((handler, routerPath) => {
      this.emitter.on(`${path}${routerPath}`, (req, res) => handler(req, res))
    })
  }

  listen(port: number) {
    this.server.listen(port, () => { console.log(`vanila-node is up on PORT: ${port}`) })
  }
}