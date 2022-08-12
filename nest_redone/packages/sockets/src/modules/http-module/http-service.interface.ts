export interface IHttpResponse<Tdata = unknown> {
  data: Tdata;
  code: number;
}

export interface IHttpService {
  post<TPayload, TResponse>(url: string, data: TPayload): Promise<any>;
  get<TResponse = unknown>(url: string): Promise<any>;
}

export interface IHttpClientOptions {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}
