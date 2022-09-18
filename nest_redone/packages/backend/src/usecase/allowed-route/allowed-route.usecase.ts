import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../core/user/user.repo';

@Injectable()
export class AllowedUsecase {
  constructor(private readonly userRepo: UserRepository) {}
  echo(name: string) {
    console.log(8989);
    return this.userRepo.execute({ name });
  }
}
