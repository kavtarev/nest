import { IHttpClientOptions } from './http-service.interface';
import { HTTP_SERVICE, HTTP_SERVICE_OPTIONS } from './constants';
import { Module } from '@nestjs/common';
import { HttpService } from './http-service';

const options: IHttpClientOptions = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 5000,
};
@Module({
  providers: [
    {
      provide: HTTP_SERVICE_OPTIONS,
      useValue: options,
    },
    {
      provide: HTTP_SERVICE,
      useFactory: (options: IHttpClientOptions) => {
        return new HttpService(options);
      },
      inject: [HTTP_SERVICE_OPTIONS],
    },
  ],
  exports: [HTTP_SERVICE],
})
export class HttpModule {}
