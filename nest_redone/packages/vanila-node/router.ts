import { IncomingMessage, ServerResponse } from 'http';
import { createRoutesKey } from './common/create-routes.key.js';

export class Router {
  private routes: Map<
    string,
    (req: IncomingMessage, res: ServerResponse) => void
  > = new Map() 

  getRoutes() { return this.routes }

  get(route: string, handler: (req: IncomingMessage, res: ServerResponse) => void) {
    const path = createRoutesKey(route, 'GET')

    this.addToRoutes(path, handler)
  }

  post(route: string, handler: (req: IncomingMessage, res: ServerResponse) => void) {
    const path = createRoutesKey(route, 'POST')

    this.addToRoutes(path, handler)
  }

  private addToRoutes(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void) {
    if (this.routes.has(path)) {
      throw new Error('no path duplicates')
    }

    this.routes.set(path, handler)
  }
}