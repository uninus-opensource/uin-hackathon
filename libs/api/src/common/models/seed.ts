/* eslint-disable @nx/enforce-module-boundaries */
import { Pool } from 'pg';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/node-postgres';
import {
  EorganizationType,
  EorganizationLevel,
  EPermission,
} from '@psu/entities';

// import {
//   EorganizationType,
//   EorganizationLevel,
//   EPermission,
// } from '../../../../entities/src';
import { eq } from 'drizzle-orm';
import { encryptPassword } from '../utilities';

const defaultPassword = process.env['DEFAULT_USER_PASSWORD'] || '';
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
      permissions: Object.values(EPermission),
    },
    {
      name: 'Wakil Rektor',
      permissions: [
        EPermission.PROFILE_READ,
        EPermission.PROFILE_UPDATE,
        EPermission.ACTIVITY_APPROVAL_READ,
        EPermission.ACTIVITY_CHART_READ,
      ],
    },
    {
      name: 'Kemahasiswaan',
      permissions: [
        EPermission.PROFILE_READ,
        EPermission.PROFILE_UPDATE,
        EPermission.ACTIVITY_APPROVAL_READ,
        EPermission.ACTIVITY_CHART_READ,
      ],
    },
    {
      name: 'Wakil Dekan',
      permissions: [
        EPermission.PROFILE_READ,
        EPermission.PROFILE_UPDATE,
        EPermission.ACTIVITY_APPROVAL_READ,
        EPermission.ACTIVITY_CHART_READ,
      ],
    },
    {
      name: 'Ketua Program Studi',
      permissions: [
        EPermission.PROFILE_READ,
        EPermission.PROFILE_UPDATE,
        EPermission.ACTIVITY_APPROVAL_READ,
        EPermission.ACTIVITY_CHART_READ,
      ],
    },
    {
      name: 'Ormawa',
      permissions: [
        EPermission.PROFILE_READ,
        EPermission.PROFILE_UPDATE,
        EPermission.ACTIVITY_SUBMISSION_READ,
        EPermission.ACTIVITY_REPORT_READ,
        EPermission.ACTIVITY_CREATE,
        EPermission.ACTIVITY_BY_ID_READ,
        EPermission.ACTIVITY_UPDATE,
        EPermission.ACTIVITY_CHART_READ,
        EPermission.ORGANIZATION_READ,
      ],
    },
  ]);
  console.log('Seeding roles done! 🎊');
};

const seedUsers = async () => {
  const adminExist = await db
    .select({ id: schema.users.id })
    .from(schema.users)
    .leftJoin(schema.roles, eq(schema.users.roleId, schema.roles.id))
    .where(eq(schema.roles.name, 'Admin'));

  if (adminExist.length) {
    return;
  }

  const roleAdmin = await db
    .select({ id: schema.roles.id })
    .from(schema.roles)
    .where(eq(schema.roles.name, 'Admin'))
    .then((res) => res.at(0));

  console.log('Seeding users... 🚀');
  await db.insert(schema.users).values([
    {
      fullname: 'Admin',
      email: 'admin@uninus.ac.id',
      password: await encryptPassword(defaultPassword),
      roleId: roleAdmin?.id as string,
    },
  ]);
  console.log('Seeding users done! 🎊');
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
      name: 'HIMAPLB',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.PRODI,
    },
    {
      name: 'HIMAPROKSI',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.PRODI,
    },
    {
      name: 'HIMAKOM',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.PRODI,
    },
    {
      name: 'HIMAKOM',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.PRODI,
    },
    {
      name: 'BEM Teknik',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.FAKULTAS,
    },
    {
      name: 'BEM FKIP',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.FAKULTAS,
    },
    {
      name: 'BEM HUKUM',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.FAKULTAS,
    },
    {
      name: 'BEM FIKOM',
      organizationType: EorganizationType.ORMAWA,
      organizationLevel: EorganizationLevel.FAKULTAS,
    },
    {
      name: 'BEM FIKOM',
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
    {
      name: 'Resimen Mahasiswa',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Korps Protokoler ',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Ikramul Quran',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Kumpulan Remaja Masjid',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Pramuka',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Club of Photography Nusantara',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Koperasi Mahasiswa',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Pagar Nusa',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Uninus Badminton Club',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Uninus Volley Ball Club',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Kelompok Pecinta Alam',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Nusantara Basketball Club',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Uninus Footbal Club',
      organizationType: EorganizationType.UKM,
    },
    {
      name: 'Paduan Suara Mahasiswa',
      organizationType: EorganizationType.UKM,
    },
  ]);
  console.log('Seeding organizations done! 🎊');
};

const seedFaculty = async () => {
  const facultyExist = await db
    .select({ id: schema.faculty.id })
    .from(schema.faculty);

  if (facultyExist.length) {
    return;
  }
  console.log('Seeding faculty... 🚀');
  await db.insert(schema.faculty).values([
    {
      name: 'Fakultas Agama Islam',
    },
    {
      name: 'Fakultas Ekonomi',
    },
    {
      name: 'Fakultas Hukum',
    },
    {
      name: 'Fakultas Ilmu Komunikasi',
    },
    {
      name: 'Fakultas Keguruan dan Ilmu Pendidikan',
    },
    {
      name: 'Fakultas Pertanian',
    },
    {
      name: 'Fakultas Teknik',
    },
    {
      name: 'Fakultas Teknik',
    },
    {
      name: 'Sekolah Pascasarjana(S2)',
    },
    {
      name: 'Sekolah Pascasarjana(S3)',
    },
  ]);
  console.log('Seeding faculty done! 🎊');
};

const seedDepartment = async () => {
  const departmentExist = await db
    .select({ id: schema.department.id })
    .from(schema.department);

  if (departmentExist.length) {
    return;
  }
  const faculty = await db
    .select({ id: schema.faculty.id, name: schema.faculty.name })
    .from(schema.faculty);

  if (!faculty.length) {
    console.log('Failed seeding department');
    return;
  }

  const fkId = faculty.filter((el) => el.name.includes('Fakultas Ekonomi'))[0]
    .id;
  const fkipId = faculty.filter((el) =>
    el.name.includes('Fakultas Keguruan dan Ilmu Pendidikan')
  )[0].id;
  const faiId = faculty.filter((el) =>
    el.name.includes('Fakultas Agama Islam')
  )[0].id;
  const fhId = faculty.filter((el) => el.name.includes('Fakultas Hukum'))[0].id;
  const fikomId = faculty.filter((el) =>
    el.name.includes('Fakultas Ilmu Komunikasi')
  )[0].id;
  const ftanId = faculty.filter((el) =>
    el.name.includes('Fakultas Pertanian')
  )[0].id;
  const ftekId = faculty.filter((el) => el.name.includes('Fakultas Teknik'))[0]
    .id;

  console.log('Seeding department... 🚀');
  await db.insert(schema.department).values([
    {
      name: 'Komunikasi dan Penyiaran Islam',
      facultyId: faiId,
    },
    {
      name: 'Pendidikan Agama Islam',
      facultyId: faiId,
    },
    {
      name: 'Pendidikan Guru Madrasah Ibtidaiyah',
      facultyId: faiId,
    },
    {
      name: 'Perbankan Syariah',
      facultyId: faiId,
    },
    {
      name: 'Akuntansi',
      facultyId: fkId,
    },
    {
      name: 'Manajemen',
      facultyId: fkId,
    },
    {
      name: 'Ilmu Hukum',
      facultyId: fhId,
    },
    {
      name: 'Ilmu Komunikasi',
      facultyId: fikomId,
    },
    {
      name: 'Ilmu Perpustakaan',
      facultyId: fikomId,
    },
    {
      name: 'Pendidikan Bahasa Arab',
      facultyId: fkipId,
    },
    {
      name: 'Pendidikan Bahasa dan Sastra Indonesia',
      facultyId: fkipId,
    },
    {
      name: 'Pendidikan Bahasa Ingris',
      facultyId: fkipId,
    },
    {
      name: 'Pendidikan Guru Pendidikan Anak Usia Dini',
      facultyId: fkipId,
    },
    {
      name: 'Pendidikan Luar Biasa',
      facultyId: fkipId,
    },
    {
      name: 'Pendidikan Luar Sekolah',
      facultyId: fkipId,
    },
    {
      name: 'Pendidikan Matematika',
      facultyId: fkipId,
    },
    {
      name: 'Pendidikan Pancasila dan Kewarganegaraan',
      facultyId: fkipId,
    },
    {
      name: 'Agroteknologi',
      facultyId: ftanId,
    },
    {
      name: 'Teknik Elektro',
      facultyId: ftekId,
    },
    {
      name: 'Teknik Informatika',
      facultyId: ftekId,
    },
    {
      name: 'Teknik Industri',
      facultyId: ftekId,
    },
  ]);

  console.log('Seeding department done! 🎊');
};

const main = async () => {
  try {
    await seedRoles();
    await seedOrganizations();
    await seedFaculty();
    await seedDepartment();
    await seedUsers();
  } catch (error) {
    console.log(error);
  }
};

main();
