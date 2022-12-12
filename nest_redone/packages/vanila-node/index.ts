import { WhatEverRouter } from './routers/what-ever.router';
import { App } from './app';


let app = new App();

app.listen(3003);

app.get('/', (req, res) => {
  res.end('works with no routes');
});

app.addRouter('/', WhatEverRouter)





