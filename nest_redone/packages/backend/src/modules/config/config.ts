import { registerAs } from '@nestjs/config';

export const devDatabase = registerAs('dev_database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  type: 'postgres',
}));

export const prodDatabase = registerAs('prod_database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
}));

export const minioConfig = registerAs('minioConfig', () => ({
  accessKeyId: process.env.MINIO_ACCESS_KEY_ID,
  secretAccessKey: process.env.MINIO_SECRET,
  endpoint: process.env.MINIO_URL,
}));
