import { Body, Controller, Post, Request, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegistrationDto } from './registration.dto';
import { RegistrationUsecase } from './registration.usecase';

@Controller('/auth')
export class RegistrationController {
  constructor(private readonly usecase: RegistrationUsecase) {}
  @Post('register')
  async register(
    @Body() body: RegistrationDto,
    @Request() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.usecase.execute(body, req);

    res.cookie('token', result.refreshToken, { httpOnly: true });
    res.json(result);
  }
}
