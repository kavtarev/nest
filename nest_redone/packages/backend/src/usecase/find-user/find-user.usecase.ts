import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/core/user/user.repo';

@Injectable()
export class FindUserUsecase {
  constructor(private readonly repo: UserRepository) {}

  async execute(id: string) {
    return this.repo.find(id);
  }
}
