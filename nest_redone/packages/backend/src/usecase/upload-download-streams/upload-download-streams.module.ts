import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportEntity } from 'src/core/passports/passport.entity';
import { PassportRepository } from 'src/core/passports/passport.repository';
import { AuthModule } from '../../core/auth/auth.module';
import { UserEntity } from '../../core/user/user.entity';
import { UserRepository } from '../../core/user/user.repo';
import { HttpModule } from '../../modules/http-module/http-module';
import { S3Service } from './s3-service';
import { UploadDownloadStreamsController } from './upload-download-streams.controller';
import { UploadDownloadStreamsUsecase } from './upload-download-streams.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PassportEntity]),
    AuthModule,
    HttpModule,
  ],
  controllers: [UploadDownloadStreamsController],
  providers: [
    UploadDownloadStreamsUsecase,
    UserRepository,
    PassportRepository,
    S3Service,
  ],
})
export class UploadDownloadStreamsModule {}
