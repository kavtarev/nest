import { Request } from '../../own-express/request';
import { Response } from '../../own-express/response';
import { Router } from '../../own-express/router';

export const WhatEverRouter = new Router();

WhatEverRouter.get('some', (req: Request, res: Response) => {
  res.end('whatever get');
});

WhatEverRouter.get('some/some', (req: Request, res: Response) => {
  res.end('whatever get some some');
});

WhatEverRouter.post('some', (req: Request, res: Response) => {
  res.end('whatever get');
});
