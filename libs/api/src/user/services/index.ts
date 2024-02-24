import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { asc, desc, eq, ilike, and } from 'drizzle-orm';
import {
  EPaginationOrderBy,
  TPaginationRequest,
  TUserRequest,
  TUserResponse,
  TUserSingleResponse,
} from '@psu/entities';
import { encryptPassword } from '../../common';
import { dbConnection } from '../../drizzle';

const db = dbConnection;

export const userService = {
  findOne: async (id: string): Promise<TUserSingleResponse> => {
    const res = await db
      .select({
        id: schema.users.id,
        fullname: schema.users.fullname,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
        faculty: {
          id: schema.faculty.id,
          name: schema.faculty.name,
        },
        department: {
          id: schema.department.id,
          name: schema.department.name,
        },
        organization: {
          id: schema.organizations.id,
          name: schema.organizations.name,
        },
        role: {
          id: schema.roles.id,
          name: schema.roles.name,
          permissions: schema.roles.permissions,
        },
      })
      .from(schema.users)
      .leftJoin(schema.roles, eq(schema.roles.id, schema.users.roleId))
      .leftJoin(
        schema.additional,
        eq(schema.additional.userId, schema.users.id)
      )
      .leftJoin(
        schema.organizations,
        eq(schema.additional.organizationId, schema.organizations.id)
      )
      .leftJoin(
        schema.faculty,
        eq(schema.additional.facultyId, schema.faculty.id)
      )
      .leftJoin(
        schema.department,
        eq(schema.additional.departmentId, schema.department.id)
      )
      .where(eq(schema.users.id, id))
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      message: 'Berhasil mengambil data user',
      data: res,
    };
  },
  findMany: async (data: TPaginationRequest): Promise<TUserResponse> => {
    const { page = 1, perPage = 10, orderBy, search } = data;
    const orderByFunction = orderBy == EPaginationOrderBy.DESC ? desc : asc;
    const [res, count] = await Promise.all([
      db
        .select({
          id: schema.users.id,
          fullname: schema.users.fullname,
          email: schema.users.email,
          createdAt: schema.users.createdAt,
          updatedAt: schema.users.updatedAt,
          faculty: {
            id: schema.faculty.id,
            name: schema.faculty.name,
          },
          department: {
            id: schema.department.id,
            name: schema.department.name,
          },
          organization: {
            id: schema.organizations.id,
            name: schema.organizations.name,
          },
          role: {
            id: schema.roles.id,
            name: schema.roles.name,
            permissions: schema.roles.permissions,
          },
        })
        .from(schema.users)
        .leftJoin(schema.roles, eq(schema.roles.id, schema.users.roleId))
        .leftJoin(
          schema.additional,
          eq(schema.additional.userId, schema.users.id)
        )
        .leftJoin(
          schema.organizations,
          eq(schema.additional.organizationId, schema.organizations.id)
        )
        .leftJoin(
          schema.faculty,
          eq(schema.additional.facultyId, schema.faculty.id)
        )
        .leftJoin(
          schema.department,
          eq(schema.additional.departmentId, schema.department.id)
        )
        .where(
          and(...(search ? [ilike(schema.users.fullname, `%${search}%`)] : []))
        )
        .limit(Number(perPage))
        .offset((Number(page) - 1) * Number(perPage))
        .orderBy(orderByFunction(schema.users.fullname)),
      db
        .select({
          id: schema.users.id,
        })
        .from(schema.users)

        .where(
          and(...(search ? [ilike(schema.users.fullname, `%${search}%`)] : []))
        )
        .then((res) => res.length),
    ]);

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    const lastPage = Math.ceil(count / Number(perPage));
    return {
      data: res,
      meta: {
        total: count,
        lastPage,
        currentPage: Number(page),
        perPage: Number(perPage),
        prev: Number(page) > 1 ? Number(page) - 1 : null,
        next: Number(page) < lastPage ? Number(page) + 1 : null,
      },
    };
  },
  delete: async (id: string): Promise<TUserSingleResponse> => {
    const res = await db
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning({
        id: schema.users.id,
        fullname: schema.users.fullname,
        email: schema.users.email,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      message: 'Berhasil menghapus user',
      data: res,
    };
  },
  update: async (data: TUserRequest): Promise<TUserSingleResponse> => {
    const res = await db
      .update(schema.users)
      .set({
        fullname: data.fullname as string,
        email: data.email as string,
        roleId: data.roleId as string,
        avatar: data.avatar,
        password: await encryptPassword(data.password as string),
        updatedAt: new Date(),
      })
      .where(eq(schema.users.id, data.id as string))
      .returning({
        id: schema.users.id,
        fullname: schema.users.fullname,
        email: schema.users.email,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      message: 'Berhasil update user',
      data: res,
    };
  },
  create: async (data: TUserRequest): Promise<TUserSingleResponse> => {
    const res = await db
      .insert(schema.users)
      .values({
        fullname: data.fullname as string,
        email: data.email as string,
        roleId: data.roleId as string,
        avatar: data.avatar,
        password: await encryptPassword(data.password as string),
      })
      .returning({
        id: schema.users.id,
        fullname: schema.users.fullname,
        email: schema.users.email,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      message: 'Berhasil menambahkan user',
      data: res,
    };
  },
};
