import { createRoutesKey } from './common/create-routes.key.js';
import * as http from 'http';
import { Router } from './router';
import { Request } from './request';
import { Response } from './response';
import { EventEmitter } from 'events';
import * as path from 'path';
import * as fs from 'fs';

export class App {
  private emitter: EventEmitter;
  private server: http.Server;
  private staticFolder: string;
  private staticTypes: string[] = ['.js', '.css']
  private middleWares: ((req: Request, res: Response, next: any) => void)[] = []

  constructor() {
    this.emitter = new EventEmitter();
    this.server = http.createServer();
 
    this.server.on('request', async (req, res) => {
      const request = new Request(req);
      const response = new Response(res);
      const isStatic = this.isStaticReq(request)

      if (isStatic) {
        await this.sendStaticFiles(request, response)
      }
      this.runMiddleWares(request, response);
      const route = createRoutesKey(req.url, req.method)
      const result = this.emitter.emit(route, request, response)

      if(!result && !isStatic) {
        res.end('psina sutulaya')
      }
    })
  }

  use(middleWare: (req: Request, res: Response, next: any) => void) {
    this.middleWares.push(middleWare);
  }

  get(path: string, handler: (req: Request, res: Response) => void) {
    const route = createRoutesKey(path, 'GET');

    this.emitter.on(route, (req, res) => {
      handler(req, res)
    })
  }

  post(path: string, handler: (req: Request, res: Response) => void) {
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

  async sendStaticFiles(req: Request, res: Response ) {
    res.setHeader(
      'Content-Type', 
      path.extname(req.url) === '.js' 
        ? 'text/javascript' 
        : 'text/css'
      )

    fs.createReadStream(path.join(__dirname, '..', this.staticFolder, path.basename(req.url))).pipe(res.res)
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

  private isStaticReq(req: Request): boolean {
    return this.staticTypes.includes(path.extname(req.url));
  }

  private runMiddleWares(req: Request, res: Response, i: number = 0) {
    if (i < this.middleWares.length){
      let mid = this.middleWares[i];
      mid(req, res, this.runMiddleWares.bind(this, req, res, i + 1))
    }
  }

  listen(port: number) {
    this.server.listen(port, () => { console.log(`vanilla-node is up on PORT: ${port}`) })
  }
}