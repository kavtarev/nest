import { UserRepo } from '../../core/user/user.repo';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import { IRegistration } from './registration.enterface';

@Injectable()
export class RegistrationUsecase {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly auth: AuthService,
  ) {}
  async execute({ email, password }: IRegistration) {
    const user = await this.userRepo.execute({ email, password });
    const token = this.auth.issueToken(user.id);

    return token;
  }
}
