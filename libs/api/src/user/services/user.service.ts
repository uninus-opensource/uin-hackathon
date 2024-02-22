import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
@Injectable()
export class UserService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}

  async findByEmail() {
    const res = await this.drizzle
      .select({
        id: schema.users.id,
        fullname: schema.users.fullname,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
        role: {
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
      .where(eq(schema.users.email, ''))
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async findById() {
    const res = await this.drizzle
      .select({
        id: schema.users.id,
        fullname: schema.users.fullname,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
        role: {
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
      .where(eq(schema.users.id, ''))
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async findMany() {
    const res = await this.drizzle
      .select({
        id: schema.users.id,
        fullname: schema.users.fullname,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
        role: {
          name: schema.roles.name,
          permissions: schema.roles.permissions,
        },
      })
      .from(schema.users)
      .leftJoin(schema.roles, eq(schema.roles.id, schema.users.roleId))
      .leftJoin(
        schema.userAffiliations,
        eq(schema.userAffiliations.userId, schema.users.id)
      );

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async delete() {
    const res = await this.drizzle
      .delete(schema.users)
      .where(eq(schema.users.id, ''))
      .returning({
        id: schema.users.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async update() {
    const res = await this.drizzle
      .update(schema.users)
      .set({
        email: '',
      })
      .where(eq(schema.users.id, ''))
      .returning({
        id: schema.users.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async create() {
    const res = await this.drizzle
      .insert(schema.users)
      .values({
        email: '3432432',
        roleId: '',
      })
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
