import { WhatEverRouter } from './routers/what-ever.router';
import { App } from '../own-express/app';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from '../own-express/response';
import { Request } from '../own-express/request';
import { CrudRouter } from './routers/crud.router';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import * as client from 'amqplib';
import { Connection, Channel } from 'amqplib';
import { Queues } from '../rabbit/queues';

Sentry.init({
  dsn: 'https://8da54677498f40cc87649f420d08bd7e@o4504412942237696.ingest.sentry.io/4504412945711104',
  tracesSampleRate: 1.0,
});

async function start() {
  const connection: Connection = await client.connect(
    'amqp://username:password@localhost:5672'
  );

  // Create a channel
  const channel: Channel = await connection.createChannel();

  // Makes the queue available to the client
  await channel.assertQueue(Queues.send_mail);

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
      Sentry.captureEvent(e);
      Sentry.captureException(e);
    }

    fs.createReadStream(
      path.join(__dirname, '..', 'frontend', 'index.html')
    ).pipe(res.res);
  });

  app.post('/rabbit/sendmail', (req: Request, res: Response) => {
    // Send a message to the queue
    channel.sendToQueue(
      Queues.send_mail,
      Buffer.from(JSON.stringify(req.body.hui))
    );
    res.end('sended to rabbit!');
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
}

start();
