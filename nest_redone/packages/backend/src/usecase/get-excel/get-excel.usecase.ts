import { Injectable } from '@nestjs/common';

@Injectable()
export class GetExcelUsecase {
  async execute() {
    const data = { name: 'bruce hui' };

    return data;
  }
}
