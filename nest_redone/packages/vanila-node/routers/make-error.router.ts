import { Router } from '../router';

export const MakeErrorRouter = new Router();

MakeErrorRouter.get('some', (req, res) => {
  res.end('whatever get')
});


// add to app - get Error: Duplicate events: /someGET not allowed