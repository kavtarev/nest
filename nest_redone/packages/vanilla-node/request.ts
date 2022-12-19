import * as http from 'http';
import * as querystring from 'querystring';

export class Request {
  req: http.IncomingMessage;
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  params: Record<string, unknown>;

  constructor(req:http.IncomingMessage & { body: any }) {
    this.req = req;
    this.body = req.body
    console.log(222222, req.body);
    
  }

  get url() {
    return this.req.url
  }
}