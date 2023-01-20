import { Request } from '../../own-express/request';
import { Response } from '../../own-express/response';
import { Router } from '../../own-express/router';
import { pool } from '../../pg/pg';

export const CrudRouter = new Router();

CrudRouter.get('all', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      select * from test_pool;
    `);

    res.end(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    res.end('sorry');
  }
});

CrudRouter.post('post', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      insert into test_pool (name) values($1);
    `,
      [req.body['hui']]
    );

    res.end(JSON.stringify(result));
  } catch (e) {
    console.log(e);
    res.end('sorry');
  }
});

CrudRouter.post('some', (req: Request, res: Response) => {
  res.end('whatever get');
});
