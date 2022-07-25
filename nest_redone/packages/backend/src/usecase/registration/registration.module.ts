import { UserRepo } from '../../core/user/user.repo';
import { Module } from '@nestjs/common';
import { AuthModule } from '../../core/auth/auth.module';
import { RegistrationController } from './registration.controller';
import { RegistrationUsecase } from './registration.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/user/user.entity';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationUsecase, UserRepo],
  imports: [AuthModule, TypeOrmModule.forFeature([UserEntity])],
})
export class RegistrationModule {}
