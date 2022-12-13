import { createRoutesKey } from './common/create-routes.key.js';
import * as http from 'http';
import { Router } from './router';
import { EventEmitter } from 'events';
import * as path from 'path';
import * as fs from 'fs';

export class App {
  private emitter: EventEmitter;
  private server: http.Server;
  private staticFolder: string;
  private staticTypes: string[] = ['.js', '.css']

  constructor() {
    this.emitter = new EventEmitter();
    this.server = http.createServer();
 
    this.server.on('request', async (req, res) => {
      const route = createRoutesKey(req.url, req.method)
      const result = this.emitter.emit(route, req, res)
      const isStatic = this.isStaticReq(req)

      if (isStatic) {
        await this.sendStaticFiles(req, res)
      }

      if(!result && !isStatic) {
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

  registerStatic(staticFolder: string) {
    this.staticFolder = staticFolder;
  }

  async sendStaticFiles(req: http.IncomingMessage, res: http.ServerResponse ) {
    res.setHeader(
      'Content-Type', 
      path.extname(req.url) === '.js' 
        ? 'text/javascript' 
        : 'text/css'
      )

    fs.createReadStream(path.join(__dirname, '..', this.staticFolder, path.basename(req.url))).pipe(res)
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

  private isStaticReq(req: http.IncomingMessage): boolean {
    return this.staticTypes.includes(path.extname(req.url));
  }

  listen(port: number) {
    this.server.listen(port, () => { console.log(`vanila-node is up on PORT: ${port}`) })
  }
}