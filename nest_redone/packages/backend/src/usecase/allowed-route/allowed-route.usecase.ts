import { Injectable } from '@nestjs/common';
import { UserRepo } from '../../core/user/user.repo';

@Injectable()
export class AllowedUsecase {
  constructor(private readonly userRepo: UserRepo) {}
  echo(name: string) {
    return this.userRepo.execute({ name });
  }
}
