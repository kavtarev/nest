import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../core/auth/auth.module';
import { UserEntity } from '../../core/user/user.entity';
import { UserRepo } from '../../core/user/user.repo';
import { HttpModule } from '../../modules/http-module/http-module';
import { AllowedController } from './allowed-module.controller';
import { AllowedUsecase } from './allowed-route.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule, HttpModule],
  controllers: [AllowedController],
  providers: [AllowedUsecase, UserRepo],
})
export class AllowedModule {}
