import { UserRepo } from 'src/core/user/user.repo';
import { Module } from '@nestjs/common';
import { AuthModule } from 'src/core/auth/auth.module';
import { RegistrationController } from './registration.controller';
import { RegistrationUsecase } from './registration.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/user/user.etntity';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationUsecase, UserRepo],
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
})
export class RegistrationModule {}
