import { WhatEverRouter } from './routers/what-ever.router';
import { App } from './app';
import * as stream from 'stream';
import * as fs from 'fs';
import * as path from 'path';


let app = new App();

app.listen(3003);
app.registerStatic('frontend');

app.get('/', (req, res) => {
  
  fs.createReadStream(path.join(__dirname,'..', 'frontend', 'index.html')).pipe(res);
  // res.setHeader("Content-Type", "application/json");
  // res.end('{hanna: 23}');
});

app.addRouter('/', WhatEverRouter)





