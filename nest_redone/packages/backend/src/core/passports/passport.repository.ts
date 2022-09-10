import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassportEntity } from './passport.entity';

@Injectable()
export class PassportRepository {
  constructor(
    @InjectRepository(PassportEntity)
    private readonly repo: Repository<PassportEntity>,
  ) {}

  saveMany(entities: Partial<PassportEntity>[]) {
    return this.repo.save(entities);
  }
}
