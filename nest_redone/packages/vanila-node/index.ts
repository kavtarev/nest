import { WhatEverRouter } from './routers/what-ever.router';
import { MakeErrorRouter } from './routers/make-error.router';
import { App } from './app';


let app = new App();

app.listen(3003);

app.get('/', (req, res) => {
  res.end('govna-kusok');
});

app.addRouter('/', WhatEverRouter)





