import { Pool } from 'pg';

export const pool = new Pool({
  host: 'localhost',
  port: 5433,
  user: 'me',
  password: 'me',
  database: 'test',
});
