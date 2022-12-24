import { createRoutesKey } from './common/create-routes.key.js';
import { Request } from './request';
import { Response } from './response';

export class Router {
  private routes: Map<string, (req: Request, res: Response) => void> =
    new Map();

  getRoutes() {
    return this.routes;
  }

  get(route: string, handler: (req: Request, res: Response) => void) {
    const path = createRoutesKey(route, 'GET');

    this.addToRoutes(path, handler);
  }

  post(route: string, handler: (req: Request, res: Response) => void) {
    const path = createRoutesKey(route, 'POST');

    this.addToRoutes(path, handler);
  }

  private addToRoutes(
    path: string,
    handler: (req: Request, res: Response) => void
  ) {
    if (this.routes.has(path)) {
      throw new Error('no path duplicates');
    }

    this.routes.set(path, handler);
  }
}
