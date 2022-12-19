import { WhatEverRouter } from './routers/what-ever.router';
import { App } from './app';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from './response'
import { Request } from './request'
import { CrudRouter } from './routers/crud.router';

let app = new App();

app.listen(3003);
app.registerStatic('frontend');

app.get('/', (req: Request, res: Response) => {
  fs.createReadStream(path.join(__dirname,'..', 'frontend', 'index.html')).pipe(res.res);
});

app.post('/', (req, res) => {
  let boob = JSON.stringify(req.body);
  console.log('boob', boob);
  console.log('typeof boob', typeof boob);
  
  // console.log(99999, JSON.stringify(req.body));
  // res.setHeader('Content-type', 'application/json')
  // res.write(boob)
  
  console.log('req.body', req.body);

  boob = boob ? JSON.stringify(req.body) : '23'
  
  console.log('again', boob);
  
  res.end(boob as unknown as string);
});

app.use((req,res,next) => {
  console.log('first middleware');
  console.log(req.body);

  next()
})
app.use((req,res,next) => {
  console.log('second middleware');
  console.log(req.body);
  next()
})
app.use((req,res,next) => {
  console.log('third middleware');
  console.log(req.body);

  next()
})

app.use('/', (req,res,next) => {
  console.log('route middleware');
  console.log(req.body);

  next()
})

app.use('/', (req,res,next) => {
  console.log('another route middleware');
  console.log(req.body);

  next()
})

app.addRouter('/', WhatEverRouter)
app.addRouter('/api/', CrudRouter)





