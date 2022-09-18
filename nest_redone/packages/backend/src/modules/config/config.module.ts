import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { devDatabase, prodDatabase, minioConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [devDatabase, prodDatabase, minioConfig],
    }),
  ],
})
export class ConfigurationModule {}
