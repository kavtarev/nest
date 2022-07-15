import axios, { AxiosInstance } from 'axios';
import { AddressInfo } from 'net';
import { ITestClient, TestClientOptions } from './test-client.interface';

export class TestClient<Dto, Response> implements ITestClient<Dto, Response> {
  private client: AxiosInstance;

  private url: string;

  private baseUrl: string;

  constructor({ url, server }: TestClientOptions) {
    this.url = url;
    const { port } = server.address() as AddressInfo;
    this.baseUrl = `http://localhost:${port}`;
    this.client = axios.create({
      baseURL: this.baseUrl,
    });
  }

  async getRequest(): Promise<Response> {
    return this.client.get(this.url);
  }

  async postRequest(data: Dto): Promise<Response> {
    return this.client.get(this.url);
  }
}
