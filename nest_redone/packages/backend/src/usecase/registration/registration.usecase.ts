import { Injectable } from '@nestjs/common';
import { TokenRepository } from 'src/core/token/token.repository';
import { AuthService } from '../../core/auth/auth.service';
import { UserRepository } from '../../core/user/user.repo';
import { IRegistration } from './registration.interface';

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
    const result = await this.tokenRepo.save({
      userId: user.id,
      name: user.name,
      os: req.headers['user-agent'],
    });

    return { accessToken: token, refreshToken: result.id };
  }
}
