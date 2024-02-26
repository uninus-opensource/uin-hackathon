import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../common/models';
import { eq } from 'drizzle-orm';
import {
  TRoleRequest,
  TRoleResponse,
  TRoleSingleResponse,
} from '@psu/entities';
@Injectable()
export class RoleService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}
  async findOne(id: string): Promise<TRoleSingleResponse> {
    const res = await this.drizzle
      .select({
        id: schema.roles.id,
        name: schema.roles.name,
        permissions: schema.roles.permissions,
        createdAt: schema.roles.createdAt,
        updatedAt: schema.roles.updatedAt,
      })
      .from(schema.roles)
      .where(eq(schema.roles.id, id))
      .then((res) => res.at(0));
    if (!res) {
      throw new NotFoundException('Role tidak ditemukan');
    }
    return {
      message: 'Berhasil mendapatkan data',
      data: res,
    };
  }

  async findMany(): Promise<TRoleResponse> {
    const res = await this.drizzle
      .select({
        id: schema.roles.id,
        name: schema.roles.name,
        permissions: schema.roles.permissions,
        createdAt: schema.roles.createdAt,
        updatedAt: schema.roles.updatedAt,
      })
      .from(schema.roles);
    if (!res) {
      throw new NotFoundException('Role tidak tersedia');
    }
    return {
      message: 'Berhasil mendapatkan data',
      data: res,
    };
  }

  async delete(id: string): Promise<TRoleSingleResponse> {
    const res = await this.drizzle
      .delete(schema.roles)
      .where(eq(schema.roles.id, id))
      .returning({
        id: schema.roles.id,
        name: schema.roles.name,
        permissions: schema.roles.permissions,
        createdAt: schema.roles.createdAt,
        updatedAt: schema.roles.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new NotFoundException('Role tidak ditemukan');
    }
    return {
      message: 'Berhasil mengahapus data',
      data: res,
    };
  }

  async update(data: TRoleRequest): Promise<TRoleSingleResponse> {
    const { id, name, permissions } = data;
    const res = await this.drizzle
      .update(schema.roles)
      .set({
        name,
        permissions,
        updatedAt: new Date(),
      })
      .where(eq(schema.roles.id, id as string))
      .returning({
        id: schema.roles.id,
        name: schema.roles.name,
        permissions: schema.roles.permissions,
        createdAt: schema.roles.createdAt,
        updatedAt: schema.roles.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new BadRequestException('Gagal menambahkan role');
    }

    return {
      message: 'Berhasil update data',
      data: res,
    };
  }

  async create(data: TRoleRequest): Promise<TRoleSingleResponse> {
    const { name, permissions } = data;
    const res = await this.drizzle
      .insert(schema.roles)
      .values({
        name,
        permissions,
      })
      .returning({
        id: schema.roles.id,
        name: schema.roles.name,
        permissions: schema.roles.permissions,
        createdAt: schema.roles.createdAt,
        updatedAt: schema.roles.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new BadRequestException('Gagal menambahkan role');
    }

    return {
      message: 'Berhasil menambahkan data',
      data: res,
    };
  }
}
