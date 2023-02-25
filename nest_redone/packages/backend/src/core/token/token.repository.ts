import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from './token.entity';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly repo: Repository<TokenEntity>,
  ) {}

  async getOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async deleteOne(token: TokenEntity) {
    return this.repo.remove(token);
  }

  async save(props: Partial<TokenEntity>) {
    return this.repo.save(props);
  }
}
