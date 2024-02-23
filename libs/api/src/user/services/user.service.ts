import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { TUserRequest } from '@psu/entities';
@Injectable()
export class UserService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}

  async findOne(id: string) {
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
    return res;
  }
  async findMany(data: any) {
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
      );

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      data: res,
      meta: {
        total: 0,
        lastPage: 0,
        currentPage: 0,
        perPage: 0,
        prev: null,
        next: null,
      },
    };
  }
  async delete(id: string) {
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
  async update(data: TUserRequest) {
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
  async create(data: TUserRequest) {
    const res = await this.drizzle
      .insert(schema.users)
      .values(data)
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
