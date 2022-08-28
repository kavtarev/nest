import { HTTP_SERVICE } from './../../modules/http-module/constants';
import {
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IHttpService } from '../../modules/http-module/http-service.interface';
import { AllowedUsecase } from './allowed-route.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { S3 } from 'aws-sdk';

@Controller('/')
export class AllowedController {
  constructor(
    @Inject(HTTP_SERVICE)
    private readonly httpService: IHttpService,
    private readonly usecase: AllowedUsecase,
  ) {}

  // @RequireAuth()
  @Get('pes')
  async getMe(@Query('name') name: string) {
    const result = await this.usecase.echo(JSON.stringify(name));
    const awayResult = await this.httpService.get('todos/1');
    return { result, awayResult };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    const s3Stream = new S3({
      accessKeyId: 'ozontech',
      secretAccessKey: 'minio123',
      endpoint: 'http://minio:9000',
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
    });
    console.log(file);

    await s3Stream
      .upload({
        Bucket: 'test',
        Key: file.originalname,
        Body: file.buffer.toString(),
      })
      .promise();
  }
}
