import { DynamicModule, ForwardReference, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { baseModules, baseProviders } from '../app.module';
import { TestClient } from './test-clients/test-client';

export async function setup({
  modules,
  routes,
}: {
  modules: (
    | Type<any>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference<any>
  )[];
  routes: string[];
}) {
  const moduleRef = await Test.createTestingModule({
    imports: [...baseModules, ...modules],
    providers: [...baseProviders],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  await app.listen(0);

  const clients = routes.map(
    (r) =>
      new TestClient({
        url: r,
        server: app.getHttpServer(),
      }),
  );

  return {
    app,
    clients,
  };
}
