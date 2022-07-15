import { INestApplication } from '@nestjs/common';
import { setup } from '../../../src/test/setup';
import { ITestClient } from '../../../src/test/test-clients/test-client.interface';
import { AllowedModule } from './allowed-route.module';

describe('first test', () => {
  let app: INestApplication;

  let client: ITestClient<any, any>;

  beforeAll(async () => {
    ({
      app,
      clients: [client],
    } = await setup({
      modules: [AllowedModule],
      routes: ['pes'],
    }));
  });

  it('test initial', async () => {
    const data = await client.getRequest();
    console.log(data);
    expect(data).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
