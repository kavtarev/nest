import {
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RefreshUsecase } from './refresh.usecase';

@Controller()
export class RefreshController {
  constructor(private readonly usecase: RefreshUsecase) {}

  @Post('refresh')
  async execute(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['token'];

    if (!token) {
      throw new UnauthorizedException('govnoed');
    }

    const result = await this.usecase.execute(token);

    res.clearCookie('token');
    res.cookie('token', result.refreshToken, { httpOnly: true });
    res.json(result);
  }
}
