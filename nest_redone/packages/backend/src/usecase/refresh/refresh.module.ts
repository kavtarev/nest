import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/core/auth/auth.module';
import { TokenEntity } from 'src/core/token/token.entity';
import { TokenRepository } from 'src/core/token/token.repository';
import { RefreshController } from './refresh.controller';
import { RefreshUsecase } from './refresh.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TokenEntity]), AuthModule],
  providers: [RefreshUsecase, TokenRepository],
  controllers: [RefreshController],
})
export class RefreshModule {}
