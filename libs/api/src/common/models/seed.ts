import { Pool } from 'pg';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
// import { faker } from '@faker-js/faker';

const dbUrl = process.env['DATABASE_URL'] as string;
const dbQueryClient = new Pool({
  connectionString: dbUrl,
});
const db = drizzle(dbQueryClient, {
  schema,
});

const seedRoles = async () => {
  const rolesExist = await db
    .select({ id: schema.roles.id })
    .from(schema.roles);

  if (rolesExist.length) {
    return;
  }
  console.log('Seeding roles... 🚀');
  await db.insert(schema.roles).values([
    {
      name: 'Admin',
    },
    {
      name: 'Wakil Rektor',
    },
    {
      name: 'Kemahasiswaan',
    },
    {
      name: 'Wakil Dekan',
    },
    {
      name: 'Ketua Program Studi',
    },
    {
      name: 'Ormawa',
    },
  ]);
  console.log('Seeding roles done! 🎊');
};

const main = async () => {
  try {
    await seedRoles();
  } catch (error) {
    console.log(error);
  }
};

main();
