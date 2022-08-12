import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IHttpClientOptions, IHttpService } from './http-service.interface';

export class HttpService implements IHttpService {
  client: AxiosInstance;
  constructor(options: IHttpClientOptions) {
    this.client = axios.create({
      baseURL: options.baseURL,
      headers: options.headers,
      timeout: options.timeout,
    });
  }

  async get(url: string): Promise<any> {
    return this.request(() => this.client.get(url), url);
  }

  async post(url: string, data: any): Promise<any> {
    return this.request(() => this.client.post(url, data), url);
  }

  private async request(cb: () => Promise<AxiosResponse>, route: string) {
    try {
      const response = await cb();
      return { data: response.data, status: response.status };
    } catch (error) {
      return {
        message: `Error occurred during call to route: ${route}`,
        isTimeout: axios.isAxiosError(error) && error.code === 'ECONNABORTED',
        reason: axios.isAxiosError(error) ? error.toJSON() : error,
        status: axios.isAxiosError(error) ? error.response?.status : undefined,
      };
    }
  }
}
