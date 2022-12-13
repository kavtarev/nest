import * as http from 'http';

export class Request {
  req: http.IncomingMessage;
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  params: Record<string, unknown>;

  constructor(req:http.IncomingMessage) {
    this.req = req;
  }

  get url() {
    return this.req.url
  }

}