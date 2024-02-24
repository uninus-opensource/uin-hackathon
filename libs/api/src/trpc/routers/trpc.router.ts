import { INestApplication, Injectable } from '@nestjs/common';
import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { authService } from '../../auth';
import { TLoginRequest, TRegisterRequest } from '@psu/entities';
export const t = initTRPC.create();
export const router = t.router;
export const procedure = t.procedure;
export const appRouter = router({
  hello: procedure.query(() => {
    return 'Hello, World!';
  }),
  auth: router({
    login: procedure
      .input(z.object({ email: z.string(), password: z.string() }))
      .query(async ({ input }) => {
        return await authService.login(input as TLoginRequest);
      }),
    register: procedure
      .input(
        z.object({
          email: z.string(),
          password: z.string(),
          fullname: z.string(),
        })
      )
      .query(async ({ input }) => {
        return await authService.register(input as TRegisterRequest);
      }),
  }),
});

export type AppRouter = typeof appRouter;

@Injectable()
export class TrpcRouter {
  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: appRouter })
    );
  }
}
