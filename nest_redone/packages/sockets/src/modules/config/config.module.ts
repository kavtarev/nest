import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { devDatabase, prodDatabase } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [devDatabase, prodDatabase],
    }),
  ],
})
export class ConfigurationModule {}
