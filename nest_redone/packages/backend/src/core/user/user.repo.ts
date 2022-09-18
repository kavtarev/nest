import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async register(data: Partial<UserEntity>) {
    const entity = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    return this.repo.save(entity);
  }

  async find(id: string) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new Error('no user found');
    }

    return user;
  }
}
