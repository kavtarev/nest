import { WhatEverRouter } from './routers/what-ever.router';
import { App } from './app';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from './response';
import { Request } from './request';
import { CrudRouter } from './routers/crud.router';
import * as Sentry from '@sentry/node';
// or use es6 import statements
// import * as Sentry from '@sentry/node';

// or use es6 import statements
import "@sentry/tracing";

// import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: 'https://8da54677498f40cc87649f420d08bd7e@o4504412942237696.ingest.sentry.io/4504412945711104',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const PORT = 3003;
const app = new App();

app.listen(PORT, () => {
  console.log(`server is up on port: ${PORT}`);
});
app.registerStatic('frontend');

app.get('/', (req: Request, res: Response) => {
  try {
    throw new Error('sentry!');
  } catch (e) {
    console.log(909090);

    Sentry.captureEvent(e);
    Sentry.captureException(e);
  }

  fs.createReadStream(
    path.join(__dirname, '..', 'frontend', 'index.html')
  ).pipe(res.res);
});

app.post('/', (req, res) => {
  const boob = JSON.stringify(req.body);

  res.end(boob as unknown as string);
});

app.addRouter('/', WhatEverRouter);
app.addRouter('/api/', CrudRouter);

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
