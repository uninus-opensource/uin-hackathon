import { router, procedure } from '../../trpc';
import { z } from 'zod';

export const activityRouter = router({
  findOne: procedure.input(z.string()).query(async ({ input }) => {
    return [];
  }),
  findMany: procedure
    .input(z.object({ page: z.number(), perPage: z.number() }))
    .query(async ({ input }) => {
      return [];
    }),
});
