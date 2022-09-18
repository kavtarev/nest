import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDownloadStreamsUsecase } from './upload-download-streams.usecase';

@Controller('/')
export class UploadDownloadStreamsController {
  constructor(private readonly usecase: UploadDownloadStreamsUsecase) {}

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
