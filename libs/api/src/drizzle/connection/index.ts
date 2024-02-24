import * as schema from '../../common/models';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const dbUrl = process.env['DATABASE_URL'] as string;

const dbQueryClient = new Pool({
  connectionString: dbUrl,
});

export const dbConnection = drizzle(dbQueryClient, {
  schema,
});
