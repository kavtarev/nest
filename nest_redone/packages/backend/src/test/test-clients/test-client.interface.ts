import { Server } from 'http';

export interface TestClientOptions {
  url: string;
  server: Server;
}

export interface ITestClient<Dto, Response> {
  getRequest(): Promise<Response>;
  postRequest(data: Dto): Promise<Response>;
}
