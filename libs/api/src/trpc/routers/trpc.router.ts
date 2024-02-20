import { INestApplication, Injectable } from '@nestjs/common';
// import * as trpcExpress from '@trpc/server/adapters/express';
// eslint-disable-next-line @nx/enforce-module-boundaries
// import { appRouter } from '@psu/trpc';
@Injectable()
export class TrpcRouter {
  async applyMiddleware(app: INestApplication) {
    app
      .use
      // `/trpc`,
      // trpcExpress.createExpressMiddleware({ router: appRouter })
      ();
  }
}
