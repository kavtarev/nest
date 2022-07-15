import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async execute(data: Partial<UserEntity>) {
    const entity = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    return this.repo.save(entity);
  }

  async find(id: string) {
    return this.repo.find({ where: { id } });
  }
}
