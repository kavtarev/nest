import { Request } from '../request';
import { Response } from '../response';
import { Router } from '../router';

export const WhatEverRouter = new Router();

WhatEverRouter.get('some', (req: Request, res: Response) => {
  res.end('whatever get')
});

WhatEverRouter.get('some/some', (req: Request, res: Response) => {
  res.end('whatever get some some')
});

WhatEverRouter.post('some', (req: Request, res: Response) => {
  res.end('whatever get')
});

