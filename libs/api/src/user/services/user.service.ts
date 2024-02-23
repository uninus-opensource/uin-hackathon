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
@Injectable()
export class UserService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}

  async findOne(id: string): Promise<TUserSingleResponse> {
    const res = await this.drizzle
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
        schema.userAffiliations,
        eq(schema.userAffiliations.userId, schema.users.id)
      )
      .leftJoin(
        schema.organizations,
        eq(schema.userAffiliations.organizationId, schema.organizations.id)
      )
      .leftJoin(
        schema.faculty,
        eq(schema.userAffiliations.facultyId, schema.faculty.id)
      )
      .leftJoin(
        schema.department,
        eq(schema.userAffiliations.departmentId, schema.department.id)
      )
      .where(eq(schema.users.id, id))
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      data: res,
    };
  }
  async findMany(data: TPaginationRequest): Promise<TUserResponse> {
    const { page = 1, perPage = 10, orderBy, search } = data;
    const orderByFunction = orderBy == EPaginationOrderBy.DESC ? desc : asc;
    const [res, count] = await Promise.all([
      this.drizzle
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
          schema.userAffiliations,
          eq(schema.userAffiliations.userId, schema.users.id)
        )
        .leftJoin(
          schema.organizations,
          eq(schema.userAffiliations.organizationId, schema.organizations.id)
        )
        .leftJoin(
          schema.faculty,
          eq(schema.userAffiliations.facultyId, schema.faculty.id)
        )
        .leftJoin(
          schema.department,
          eq(schema.userAffiliations.departmentId, schema.department.id)
        )
        .where(
          and(...(search ? [ilike(schema.users.fullname, `%${search}%`)] : []))
        )
        .limit(Number(perPage))
        .offset((Number(page) - 1) * Number(perPage))
        .orderBy(orderByFunction(schema.users.fullname)),
      this.drizzle
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
  }
  async delete(id: string): Promise<TUserSingleResponse> {
    const res = await this.drizzle
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
  }
  async update(data: TUserRequest): Promise<TUserSingleResponse> {
    const { id, ...resData } = data;
    const res = await this.drizzle
      .update(schema.users)
      .set(resData)
      .where(eq(schema.users.id, id as string))
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
  }
  async create(data: TUserRequest): Promise<TUserSingleResponse> {
    const res = await this.drizzle
      .insert(schema.users)
      .values({
        fullname: data.fullname,
        email: data.email as string,
        roleId: data.roleId,
        avatar: data.avatar,
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
  }
}
