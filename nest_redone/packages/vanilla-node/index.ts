import { WhatEverRouter } from './routers/what-ever.router';
import { App } from './app';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from './response'
import { Request } from './request'
import { CrudRouter } from './routers/crud.router';
const PORT = 3003;
let app = new App();

app.listen(PORT, () => { console.log(`server is up on port: ${PORT}`);
});
app.registerStatic('frontend');

app.get('/', (req: Request, res: Response) => {
  fs.createReadStream(path.join(__dirname,'..', 'frontend', 'index.html')).pipe(res.res);
});

app.post('/', (req, res) => {
  let boob = JSON.stringify(req.body);

  res.end(boob as unknown as string);
});

app.addRouter('/', WhatEverRouter)
app.addRouter('/api/', CrudRouter)

// app.use((req,res,next) => {
//   console.log('first middleware');
//   next()
// })
// app.use((req,res,next) => {
//   console.log('second middleware');
//   next()
// })
// app.use((req,res,next) => {
//   console.log('third middleware');
//   next()
// })
// app.use('/', (req,res,next) => {
//   console.log('route middleware');
//   next()
// })
// app.use('/', (req,res,next) => {
//   console.log('another route middleware');
//   next()
// })






