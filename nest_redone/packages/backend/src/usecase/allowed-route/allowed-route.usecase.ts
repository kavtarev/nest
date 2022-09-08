import { Injectable } from '@nestjs/common';
import { UserRepo } from '../../core/user/user.repo';

@Injectable()
export class AllowedUsecase {
  constructor(private readonly userRepo: UserRepo) {}
  echo(name: string) {
    console.log(8989);

    return this.userRepo.execute({ name });
  }
}
