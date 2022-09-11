import { S3 } from 'aws-sdk';
import { S3Readable } from './s3.readable';

export function CreateS3readable(
  S3: S3,
  bucketOpts: S3.GetObjectRequest,
): Promise<S3Readable> {
  return new Promise((resolve, reject) => {
    try {
      S3.headObject({ ...bucketOpts }, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(
          new S3Readable({
            s3: S3,
            length: data.ContentLength,
            bucketOpts,
            opts: {},
          }),
        );
      });
    } catch (err) {
      throw new Error(err);
    }
  });
}
