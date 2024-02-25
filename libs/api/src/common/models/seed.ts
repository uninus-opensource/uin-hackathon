import { Pool } from 'pg';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
// import { faker } from '@faker-js/faker';

enum EorganizationType {
  ORMAWA = 'Ormawa',
  UKM = 'UKM',
}

enum EorganizationLevel {
  UNIVERSITAS = 'Universitas',
  FAKULTAS = 'Fakultas',
  PRODI = 'Prodi',
}

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

const seedOrganizations = async () => {
  const organizationExist = await db
    .select({ id: schema.organizations.id })
    .from(schema.organizations);

  if (organizationExist.length) {
    return;
  }
  console.log('Seeding organizations... 🚀');
  await db.insert(schema.organizations).values([
    {
      name: 'HIMATIF',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.PRODI,
    },
    {
      name: 'HMTI',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.PRODI,
    },
    {
      name: 'HMTE',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.PRODI,
    },
    {
      name: 'Senat Teknik',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.FAKULTAS,
    },
    {
      name: 'Dewan Mahasiswa',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.UNIVERSITAS,
    },
    {
      name: 'Taekwondo',
      organizationType: EorganizationType.UKM,
    },
  ]);
  console.log('Seeding organizations done! 🎊');
};

const main = async () => {
  try {
    await seedRoles();
    await seedOrganizations();
  } catch (error) {
    console.log(error);
  }
};

main();
