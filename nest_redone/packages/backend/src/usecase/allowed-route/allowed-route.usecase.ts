import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../core/user/user.repo';

@Injectable()
export class AllowedRouteUsecase {
  constructor(private readonly userRepo: UserRepository) {}
  echo(name: string) {
    return name;
  }
}
