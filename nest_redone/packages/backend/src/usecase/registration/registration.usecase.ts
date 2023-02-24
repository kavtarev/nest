import { UserRepository } from '../../core/user/user.repo';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../core/auth/auth.service';
import { IRegistration } from './registration.interface';
import { TokenRepository } from 'src/core/token/token.repository';

@Injectable()
export class RegistrationUsecase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly auth: AuthService,
    private readonly tokenRepo: TokenRepository,
  ) {}
  async execute({ email, password }: IRegistration, req: Request) {
    const user = await this.userRepo.register({ email, password });
    const token = this.auth.issueToken(user.id);
    const res = await this.tokenRepo.save({
      name: user.name,
      os: req.headers['user-agent'],
    });

    return { accessToken: token, refreshToken: res.id };
  }
}
