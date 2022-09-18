import { Injectable } from '@nestjs/common';
import { PassportRepository } from 'src/core/passports/passport.repository';

import { S3Service } from './s3-service';

@Injectable()
export class UploadDownloadStreamsUsecase {
  constructor(
    private readonly s3Service: S3Service,
    private readonly passportRepo: PassportRepository,
  ) {}

  upload(file: any) {
    const bucketParams = {
      Bucket: 'test',
      Key: 'some key2',
      Body: file.buffer.toString(),
    };

    this.s3Service.upload(bucketParams);
  }

  async download() {
    const bucketParams = {
      Bucket: 'test',
      Key: 'some key2',
    };

    const stream = await this.s3Service.getReadStream(bucketParams);

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
