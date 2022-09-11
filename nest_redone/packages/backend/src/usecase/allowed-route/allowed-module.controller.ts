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
import { HTTP_SERVICE } from './../../modules/http-module/constants';
import { AllowedUsecase } from './allowed-route.usecase';

@Controller('/')
export class AllowedController {
  constructor(
    @Inject(HTTP_SERVICE)
    private readonly httpService: IHttpService,
    private readonly usecase: AllowedUsecase,
    private readonly passportRepo: PassportRepository,
  ) {}

  // @RequireAuth()
  @Get('pes')
  async getMe(@Query('name') name: string) {
    const result = await this.usecase.echo(JSON.stringify(name));
    // const awayResult = await this.httpService.get('todos/1');
    // return { result, awayResult };
    return result;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const s3Stream = new S3({
      accessKeyId: 'ozontech',
      secretAccessKey: 'minio123',
      endpoint: 'http://minio:9000',
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
    });
    const bucketParams = {
      Bucket: 'test',
    };

    try {
      await s3Stream.headBucket(bucketParams).promise();
      console.log('we here');

      await s3Stream
        .upload({
          Bucket: 'test',
          Key: 'some key2',
          Body: file.buffer.toString(),
        })
        .promise();

      console.log('and here');
    } catch (e) {
      if (e.statusCode === 404) {
        console.log('get 404, no bucket found');

        await s3Stream.createBucket(bucketParams, (err, data) => {
          console.log(34);
        });

        await s3Stream
          .upload({
            Bucket: 'test',
            Key: 'some key2',
            Body: file.buffer.toString(),
          })
          .promise();
      } else {
        throw new Error('wrong');
      }
    }
  }
  @Get('s3')
  async getFile() {
    const s3Stream = new S3({
      accessKeyId: 'ozontech',
      secretAccessKey: 'minio123',
      endpoint: 'http://minio:9000',
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
    });

    const stream = await CreateS3readable(s3Stream, {
      Bucket: 'test',
      Key: 'some key2',
    });

    let data = '';

    stream.on('data', async (chunk) => {
      console.log('chunk.toString()', chunk.toString());

      data = (data + chunk.toString()) as string;

      const endOfString = data.endsWith('\n');
      console.log('data', data);

      const passports = data.split('\n').map((item) => {
        return {
          data: item.replace(', ', ''),
        };
      });

      console.log('passports', passports);

      if (!endOfString) {
        const end = passports.pop();
        data = end.data || '';
      } else {
        data = '';
      }

      await this.passportRepo.saveMany(passports);
    });
  }
}
