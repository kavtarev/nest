import { Controller, Get } from '@nestjs/common';

@Controller('socket')
export class SocketController {
  constructor() {}

  @Get()
  async execute() {
    //const result = await this.usecase.execute()
    throw new Error('h');
    
    return 89;
  }
}
