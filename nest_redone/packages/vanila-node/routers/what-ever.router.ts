import { Router } from './../router';

export const WhatEverRouter = new Router();

WhatEverRouter.get('some', (req, res) => {
  res.end('whatever get')
});

WhatEverRouter.get('some/some', (req, res) => {
  res.end('whatever get some some')
});

WhatEverRouter.post('some', (req, res) => {
  res.end('whatever get')
});

