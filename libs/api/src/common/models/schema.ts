import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  boolean,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullname: text('fullname'),
  email: text('email').notNull(),
  avatar: text('avatar'),
  password: text('password'),
  roleId: uuid('role_id').references(() => roles.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const roles = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  permissions: text('permissions').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const userAffiliations = pgTable(
  'user_affiliations',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    organizationId: uuid('organization_id').references(() => organizations.id),
    facultyId: uuid('faculty_id').references(() => faculty.id),
    departmentId: uuid('department_id').references(() => department.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (affiliations) => ({
    compoundKey: primaryKey({
      columns: [affiliations.userId, affiliations.organizationId],
    }),
  })
);

export const activities = pgTable('activities', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  description: text('description'),
  location: text('location'),
  startDate: timestamp('start_date', { withTimezone: true }),
  endDate: timestamp('end_date', { withTimezone: true }),
  budget: text('budget'),
  applicantId: uuid('applicant_id').references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  facultyId: uuid('faculty_id').references(() => faculty.id),
  departmentId: uuid('department_id').references(() => department.id),
  organizationLevelId: uuid('organization_level_id').references(
    () => organizationLevel.id
  ),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const organizationLevel = pgTable('organization_level', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const faculty = pgTable('faculty', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const department = pgTable('department', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  facultyId: uuid('faculty_id').references(() => faculty.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  reviewerId: uuid('reviewer_id').references(() => users.id),
  isApproved: boolean('is_approved'),
  commenst: text('commenst'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  userAffiliations: one(userAffiliations),
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

//Informasi tambahan user, untuk role Wakil Dekan, Ketua Prodi dan ormawa
export const userAffiliationsRelations = relations(
  userAffiliations,
  ({ one }) => ({
    faculty: one(faculty, {
      fields: [userAffiliations.facultyId],
      references: [faculty.id],
    }),
    department: one(department, {
      fields: [userAffiliations.departmentId],
      references: [department.id],
    }),
    organization: one(organizations, {
      fields: [userAffiliations.organizationId],
      references: [organizations.id],
    }),
  })
);

//Table kegiatan berelasi dengan user(pemohon) serta proposal (one to many)
export const activitiesRelations = relations(activities, ({ one, many }) => ({
  users: one(users, {
    fields: [activities.applicantId],
    references: [users.id],
  }),
}));

//Memuat relasi fakultas dan departmen(untuk ormawa himpunan dan senat/bem), serta terdapat organization level(universitas,fakultas, prodi)
export const organizationsRelations = relations(organizations, ({ one }) => ({
  faculty: one(faculty, {
    fields: [organizations.facultyId],
    references: [faculty.id],
  }),
  department: one(department, {
    fields: [organizations.departmentId],
    references: [department.id],
  }),
  organizationLevel: one(organizationLevel, {
    fields: [organizations.organizationLevelId],
    references: [organizationLevel.id],
  }),
}));
// Memiliki relasi terhadap table organization(one to many)
export const organizationLevelRelations = relations(
  organizationLevel,
  ({ many }) => ({
    organization: many(organizations),
  })
);

//Memiliki relasi ke table organization (ormawa senat/bem) serta userAffiliations(untuk role Wakil Dekan, Ketua Prodi dan ormawa)
export const facultyRelations = relations(faculty, ({ many }) => ({
  userAffiliations: many(userAffiliations),
  organizations: many(organizations),
}));
//Memiliki relasi ke table organization (ormawa himpunan), fakultas serta userAffiliations(untuk role Wakil Dekan, Ketua Prodi dan ormawa)
export const departmentRelations = relations(department, ({ many, one }) => ({
  userAffiliations: many(userAffiliations),
  organizations: many(organizations),
  faculty: one(faculty, {
    fields: [department.facultyId],
    references: [faculty.id],
  }),
}));

//Memiliki relasi ke reviewer (user) dan proposal
export const reviewsRelations = relations(reviews, ({ one }) => ({
  reviewer: one(users, {
    fields: [reviews.reviewerId],
    references: [users.id],
  }),
}));

// export const accounts = pgTable(
//   'account',
//   {
//     userId: text('userId')
//       .notNull()
//       .references(() => users.id, { onDelete: 'cascade' }),
//     type: text('type').notNull(),
//     provider: text('provider').notNull(),
//     providerAccountId: text('providerAccountId').notNull(),
//     refresh_token: text('refresh_token'),
//     access_token: text('access_token'),
//     expires_at: uuid('expires_at'),
//     token_type: text('token_type'),
//     scope: text('scope'),
//     id_token: text('id_token'),
//     session_state: text('session_state'),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//   })
// );

// export const sessions = pgTable('session', {
//   sessionToken: text('sessionToken').notNull().primaryKey(),
//   userId: text('userId')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),
//   expires: timestamp('expires', { mode: 'date' }).notNull(),
// });

// export const verificationTokens = pgTable(
//   'verificationToken',
//   {
//     identifier: text('identifier').notNull(),
//     token: text('token').notNull(),
//     expires: timestamp('expires', { mode: 'date' }).notNull(),
//   },
//   (vt) => ({
//     compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
//   })
// );
