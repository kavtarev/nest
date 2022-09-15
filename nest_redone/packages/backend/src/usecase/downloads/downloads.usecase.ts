import { Injectable } from '@nestjs/common';

@Injectable()
export class DownloadsUsecase {
  async execute() {
    const data = { name: 'bruce hui', aliases: ['hui', 'megaHui'], number: 45 };

    return data;
  }
}
