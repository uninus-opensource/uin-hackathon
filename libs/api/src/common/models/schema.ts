import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  pgEnum,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
export const activityStatusEnum = pgEnum('activityStatus', [
  'Requested',
  'Completed',
  'Not Reported',
  'Rejected by Vice Dean',
  'Rejected by Vice Chancellor',
  'Rejected by Head Department',
  'Rejected by Student Government',
  'Rejected by Student Council',
  'Approved by Vice Dean',
  'Approved by Vice Chancellor',
  'Approved by Head Department',
  'Approved by Student Government',
  'Approved by Student Council',
]);

export const reviewStatusEnum = pgEnum('reviewStatus', [
  'Rejected by Vice Dean',
  'Rejected by Vice Chancellor',
  'Rejected by Head Department',
  'Rejected by Student Government',
  'Rejected by Student Council',
  'Approved by Vice Dean',
  'Approved by Vice Chancellor',
  'Approved by Head Department',
  'Approved by Student Government',
  'Approved by Student Council',
]);

export const organizationTypeEnum = pgEnum('organizationType', [
  'Ormawa',
  'UKM',
]);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  fullname: text('fullname').notNull(),
  email: text('email').notNull(),
  avatar: text('avatar'),
  password: text('password'),
  roleId: uuid('role_id')
    .notNull()
    .references(() => roles.id),
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

export const additional = pgTable(
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
  (table) => {
    return {
      organization: primaryKey({
        columns: [table.userId, table.organizationId],
      }),
      faculty: primaryKey({
        name: 'faculty',
        columns: [table.userId, table.facultyId],
      }),
      department: primaryKey({
        name: 'department',
        columns: [table.userId, table.departmentId],
      }),
    };
  }
);

export const activities = pgTable('activities', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  lead: text('lead').notNull(),
  proposal: text('proposal').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  startDate: timestamp('start_date', { withTimezone: true }).notNull(),
  endDate: timestamp('end_date', { withTimezone: true }).notNull(),
  budget: text('budget').notNull(),
  applicantId: uuid('applicant_id')
    .notNull()
    .references(() => users.id),
  status: activityStatusEnum('activityStatus').default('Requested'),
  reviewers: text('reviewers').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const organizations = pgTable('organizations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  organizationType: organizationTypeEnum('organizationType'),
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
  reviewerId: uuid('reviewer_id')
    .notNull()
    .references(() => users.id),
  activityId: uuid('activity_id')
    .notNull()
    .references(() => activities.id),
  note: text('note'),
  status: reviewStatusEnum('reviewStatus'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  additional: one(additional),
  roles: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

//Informasi tambahan user, untuk role Wakil Dekan, Ketua Prodi dan ormawa
export const additionalRelations = relations(additional, ({ one }) => ({
  faculty: one(faculty, {
    fields: [additional.facultyId],
    references: [faculty.id],
  }),
  department: one(department, {
    fields: [additional.departmentId],
    references: [department.id],
  }),
  organization: one(organizations, {
    fields: [additional.organizationId],
    references: [organizations.id],
  }),
}));

//Table kegiatan berelasi dengan user(pemohon) serta proposal (one to many)
export const activitiesRelations = relations(activities, ({ one, many }) => ({
  users: one(users, {
    fields: [activities.applicantId],
    references: [users.id],
  }),
}));

//Memiliki relasi ke table organization (ormawa senat/bem) serta additional(untuk role Wakil Dekan, Ketua Prodi dan ormawa)
export const facultyRelations = relations(faculty, ({ many }) => ({
  additional: many(additional),
}));
//Memiliki relasi ke table organization (ormawa himpunan), fakultas serta additional(untuk role Wakil Dekan, Ketua Prodi dan ormawa)
export const departmentRelations = relations(department, ({ many, one }) => ({
  additional: many(additional),
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
  activity: one(activities, {
    fields: [reviews.activityId],
    references: [activities.id],
  }),
}));
