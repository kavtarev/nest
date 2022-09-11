import { Readable, ReadableOptions } from 'stream';

import { S3 } from 'aws-sdk';

export class S3Readable extends Readable {
  private stream: S3;
  private contentLength: number;
  private bucketOpts: any;
  private index = 0;
  private bytesToGrab = 18;

  constructor({
    s3,
    length,
    bucketOpts,
    opts,
  }: {
    s3: S3;
    length: number;
    bucketOpts: S3.GetObjectRequest;
    opts: ReadableOptions;
  }) {
    super({ ...opts, highWaterMark: 25 });
    this.stream = s3;
    this.contentLength = length;
    this.bucketOpts = bucketOpts;
  }

  _read(): void {
    // highWaterMark doesn't effect things here???

    if (this.isFinished) {
      this.finishStream();
      return;
    }

    const endOfRange =
      this.index + this.bytesToGrab > this.contentLength
        ? this.contentLength
        : this.index + this.bytesToGrab;

    this.bucketOpts.Range = `bytes=${this.index}-${endOfRange}`;

    this.stream.getObject({ ...this.bucketOpts }, (err, data) => {
      if (err) {
        this.destroy(err);
        return;
      }

      this.push(data.Body);
    });

    this.setNextIndex();
  }

  get isFinished(): boolean {
    return this.index > this.contentLength;
  }

  private finishStream(): void {
    this.push(null);
  }

  private setNextIndex(): void {
    this.index = this.index + this.bytesToGrab + 1;
  }
}
