import { Module } from '@nestjs/common';
import { DownloadsController } from './downloads.controller';
import { DownloadsUsecase } from './downloads.usecase';

@Module({
  providers: [DownloadsUsecase],
  controllers: [DownloadsController],
})
export class DownloadsModule {}
