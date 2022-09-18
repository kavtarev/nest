import { INestApplication } from '@nestjs/common';
import { ITestClient } from 'src/test/test-clients/test-client.interface';
import { setup } from '../../test/setup';
import { AllowedRouteModule } from './allowed-route.module';

describe('first test', () => {
  let app: INestApplication;

  let client: ITestClient<any, any>;

  beforeAll(async () => {
    ({
      app,
      clients: [client],
    } = await setup({
      modules: [AllowedRouteModule],
      routes: ['pes'],
    }));
  });

  it('test initial', async () => {
    const data = await client.getRequest();
    expect(data).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
