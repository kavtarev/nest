import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationDto } from './registration.dto';
import { RegistrationUsecase } from './registration.usecase';

@Controller('/auth')
export class RegistrationController {
  constructor(private readonly usercase: RegistrationUsecase) {}
  @Post('register')
  async register(@Body() body: RegistrationDto) {
    const token = await this.usercase.execute(body);
    return token;
  }
}
