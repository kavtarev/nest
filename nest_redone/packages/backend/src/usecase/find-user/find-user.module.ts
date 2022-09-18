import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/user/user.entity';
import { UserRepository } from 'src/core/user/user.repo';
import { FindUserController } from './find-user.controller';
import { FindUserUsecase } from './find-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [FindUserController],
  providers: [FindUserUsecase, UserRepository],
})
export class FindUserModule {}
