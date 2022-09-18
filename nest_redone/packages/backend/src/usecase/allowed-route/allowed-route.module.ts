import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../core/user/user.entity';
import { UserRepository } from '../../core/user/user.repo';
import { HttpModule } from '../../modules/http-module/http-module';
import { AllowedRouteController } from './allowed-route.controller';
import { AllowedRouteUsecase } from './allowed-route.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), HttpModule],
  controllers: [AllowedRouteController],
  providers: [AllowedRouteUsecase, UserRepository],
})
export class AllowedRouteModule {}
