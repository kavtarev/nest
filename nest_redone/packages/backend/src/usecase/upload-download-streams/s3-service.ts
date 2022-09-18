import { S3 } from 'aws-sdk';
import { CreateS3readable } from 'src/common/create-s3readable';

export class S3Service {
  private instance: S3;

  constructor() {
    this.instance = new S3({
      accessKeyId: 'ozontech',
      secretAccessKey: 'minio123',
      endpoint: 'http://minio:9000',
      s3ForcePathStyle: true, // needed with minio?
      signatureVersion: 'v4',
    });
  }

  async upload(bucketParams: S3.PutObjectRequest) {
    const { Bucket } = bucketParams;
    try {
      await this.instance.headBucket({ Bucket }).promise();
      await this.instance.upload(bucketParams).promise();
    } catch (e) {
      if (e.statusCode === 404) {
        await this.instance.createBucket({ Bucket }, (err, data) => {
          if (err) {
            console.log(err);
          }
        });

        await this.instance.upload(bucketParams).promise();
      } else {
        throw new Error('wrong');
      }
    }
  }

  async getReadStream(bucketParams: S3.PutObjectRequest) {
    const stream = await CreateS3readable(this.instance, bucketParams);

    return stream;
  }
}
