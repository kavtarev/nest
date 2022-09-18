import {
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3 } from 'aws-sdk';
import { CreateS3readable } from 'src/common/create-s3readable';
import { S3Readable } from 'src/common/s3.readable';
import { PassportRepository } from 'src/core/passports/passport.repository';
import { IHttpService } from '../../modules/http-module/http-service.interface';
import { HTTP_SERVICE } from '../../modules/http-module/constants';
import { UploadDownloadStreamsUsecase } from './upload-download-streams.usecase';

@Controller('/')
export class UploadDownloadStreamsController {
  constructor(
    @Inject(HTTP_SERVICE)
    private readonly httpService: IHttpService,
    private readonly usecase: UploadDownloadStreamsUsecase,
    private readonly passportRepo: PassportRepository,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.usecase.upload(file);
  }

  @Get('csv-to-database')
  async getFile() {
    this.usecase.download();
  }
}
