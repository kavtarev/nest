import { UserRepository } from '../../core/user/user.repo';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../../core/auth/auth.service';
import { IRegistration } from './registration.interface';

@Injectable()
export class RegistrationUsecase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly auth: AuthService,
  ) {}
  async execute({ email, password }: IRegistration) {
    const user = await this.userRepo.register({ email, password });
    const token = this.auth.issueToken(user.id);

    return token;
  }
}
