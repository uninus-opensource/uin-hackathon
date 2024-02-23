import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
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
  async findMany(data:any) {
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
    return res;
  }
  async delete(id: string) {
    const res = await this.drizzle
      .delete(schema.users)
      .where(eq(schema.users.id, id))
      .returning({
        id: schema.users.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async update(data: any) {
    const { id, ...resData } = data;
    const res = await this.drizzle
      .update(schema.users)
      .set(resData)
      .where(eq(schema.users.id, id))
      .returning({
        id: schema.users.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async create(data: any) {
    const res = await this.drizzle
      .insert(schema.users)
      .values(data)
      .returning({
        id: schema.users.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
}
