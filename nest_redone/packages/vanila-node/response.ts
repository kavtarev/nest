import * as http from 'http';

export class Response {
  res: http.ServerResponse;

  constructor(res:http.ServerResponse) {
    this.res = res;
  }

  send(data: string) {
    this.res.setHeader('Content-type', 'application/json');
    this.res.write(data);
    this.res.end();
  }
}