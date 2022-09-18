import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { LoggingGuard } from 'src/common/handlers/guards/logging.guard';
import { LoggingInterceptor } from 'src/common/handlers/interceptors/logging.interceptor';

@UseGuards(LoggingGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('/')
export class RequestHandlersPlaygroundController {
  @Get('handlers')
  async execute() {
    return;
  }
}
