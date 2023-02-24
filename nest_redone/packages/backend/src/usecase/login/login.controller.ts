import { Controller, Post, Request } from '@nestjs/common';
import { RequireAuth } from 'src/common/handlers/guards/user.guard';

@RequireAuth()
@Controller()
export class LoginController {
  // constructor() {}

  @Post('login')
  async execute(@Request() req: any) {
    console.log(23233, req.user);
  }
}
