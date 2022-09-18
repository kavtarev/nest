import { Module } from '@nestjs/common';
import { RequestHandlersPlaygroundController } from './request-handlers-playground.controller';

@Module({
  controllers: [RequestHandlersPlaygroundController],
})
export class RequestHandlersPlaygroundModule {}
