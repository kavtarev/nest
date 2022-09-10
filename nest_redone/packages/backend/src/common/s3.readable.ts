import { Readable, ReadableOptions } from 'stream';

import { S3 } from 'aws-sdk';

export class S3Readable extends Readable {
  private stream: S3;

  constructor({ s3, opts }: { s3: S3; opts: ReadableOptions }) {
    super(opts);
    this.stream = s3;
  }

  _read(): void {
    this.stream.getObject((err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      this.push(data);
    });
  }
}
