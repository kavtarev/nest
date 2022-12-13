import * as http from 'http';
import * as querystring from 'querystring';

export class Request {
  req: http.IncomingMessage;
  body: Record<string, unknown>;
  query: Record<string, unknown>;
  params: Record<string, unknown>;

  constructor(req:http.IncomingMessage) {
    this.req = req;
    this.parseBody()
    
  }

  get url() {
    return this.req.url
  }

  private parseBody() {
    let tempBody: string = '';

    this.req.on('data', chunk => {
      tempBody += chunk.toString();

      if (tempBody.length > 1e6) { 
        // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
        this.req.destroy();
    }
    })

    this.req.on('end', () => {
      try {
        this.body = JSON.parse(tempBody)
      } catch(e) {        
        this.req.destroy()
      }
    })
  }
}