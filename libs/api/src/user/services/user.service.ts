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
    try {
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
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findById() {
    try {
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
        .where(eq(schema.users.id, 0))
        .then((res) => res.at(0));

      if (!res) {
        throw new NotFoundException('User tidak ditemukan');
      }
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findMany() {
    try {
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
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async delete() {
    try {
      const res = await this.drizzle
        .delete(schema.users)
        .where(eq(schema.users.id, 0))
        .returning({
          id: schema.users.id,
        })
        .then((res) => res.at(0));

      if (!res) {
        throw new NotFoundException('User tidak ditemukan');
      }
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async update() {
    try {
      const res = await this.drizzle
        .update(schema.users)
        .set({
          email: '',
        })
        .where(eq(schema.users.id, 0))
        .returning({
          id: schema.users.id,
        })
        .then((res) => res.at(0));

      if (!res) {
        throw new NotFoundException('User tidak ditemukan');
      }
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async create() {
    try {
      const res = await this.drizzle
        .insert(schema.users)
        .values({
          email: '',
        })
        .returning({
          id: schema.users.id,
        })
        .then((res) => res.at(0));

      if (!res) {
        throw new NotFoundException('User tidak ditemukan');
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
