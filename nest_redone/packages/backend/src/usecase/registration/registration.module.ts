import { UserRepository } from '../../core/user/user.repo';
import { Module } from '@nestjs/common';
import { AuthModule } from '../../core/auth/auth.module';
import { RegistrationController } from './registration.controller';
import { RegistrationUsecase } from './registration.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/user/user.entity';
import { TokenRepository } from 'src/core/token/token.repository';
import { TokenEntity } from 'src/core/token/token.entity';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationUsecase, UserRepository, TokenRepository],
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity, TokenEntity])],
})
export class RegistrationModule {}
