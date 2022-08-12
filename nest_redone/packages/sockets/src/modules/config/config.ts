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
