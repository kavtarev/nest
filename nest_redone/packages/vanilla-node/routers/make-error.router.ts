import { Router } from '../router';
import { Response } from '../response';
import { Request } from '../request';

export const MakeErrorRouter = new Router();

MakeErrorRouter.get('some', (req: Request, res: Response) => {
  res.end('whatever get')
});


// add to app - get Error: Duplicate events: /someGET not allowed