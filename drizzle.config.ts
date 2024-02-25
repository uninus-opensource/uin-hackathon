import type { Config } from 'drizzle-kit';

export default {
  schema: 'libs/api/src/common/models/schema/index.ts',
  out: './libs/api/src/common/models/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
} satisfies Config;
