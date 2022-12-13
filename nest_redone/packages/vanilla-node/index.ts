import { WhatEverRouter } from './routers/what-ever.router';
import { App } from './app';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from './response'
import { Request } from './request'


let app = new App();

app.listen(3003);
app.registerStatic('frontend');

app.get('/', (req: Request, res: Response) => {
  fs.createReadStream(path.join(__dirname,'..', 'frontend', 'index.html')).pipe(res.res);
});

app.post('/', (req, res) => {
  res.end('[{"what": "ever"}, {"what": "ever"}]');
});

app.use((req,res,next) => {
  console.log('first middleware');
  next()
})
app.use((req,res,next) => {
  console.log('second middleware');
  next()
})
app.use((req,res,next) => {
  console.log('third middleware');
  next()
})

app.addRouter('/', WhatEverRouter)





