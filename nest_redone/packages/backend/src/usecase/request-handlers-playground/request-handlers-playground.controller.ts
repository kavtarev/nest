import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { LoggingGuard } from 'src/common/handlers/guards/logging.guard';
import { LoggingInterceptor } from 'src/common/handlers/interceptors/logging.interceptor';

@UseGuards(LoggingGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('/')
export class RequestHandlersPlaygroundController {
  @Get('handlers')
  async execute() {
    let b = 0;
    for (let i = 0; i < 1000; i++) {
      b += i;
    }
    return b;
  }
}
