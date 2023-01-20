import { Router } from '../../own-express/router';
import { Response } from '../../own-express/response';
import { Request } from '../../own-express/request';

export const MakeErrorRouter = new Router();

MakeErrorRouter.get('some', (req: Request, res: Response) => {
  res.end('whatever get');
});

// add to app - get Error: Duplicate events: /someGET not allowed
