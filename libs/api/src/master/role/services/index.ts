import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../common/models';
import { and, asc, desc, eq, ilike } from 'drizzle-orm';
import {
  EPaginationOrderBy,
  TPaginationRequest,
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

  async findMany(data: TPaginationRequest): Promise<TRoleResponse> {
    const { page = 1, perPage = 10, orderBy, search } = data;
    const orderByFunction = orderBy == EPaginationOrderBy.DESC ? desc : asc;
    const [res, count] = await Promise.all([
      this.drizzle
        .select({
          id: schema.roles.id,
          name: schema.roles.name,
          permissions: schema.roles.permissions,
          createdAt: schema.roles.createdAt,
          updatedAt: schema.roles.updatedAt,
        })
        .from(schema.roles)
        .where(
          and(...(search ? [ilike(schema.roles.name, `%${search}%`)] : []))
        )
        .limit(Number(perPage))
        .offset((Number(page) - 1) * Number(perPage))
        .orderBy(orderByFunction(schema.roles.name)),
      this.drizzle
        .select({
          id: schema.roles.id,
        })
        .from(schema.roles)
        .where(
          and(...(search ? [ilike(schema.roles.name, `%${search}%`)] : []))
        )
        .then((res) => res.length),
    ]);

    if (!res) {
      throw new NotFoundException('Role tidak tersedia');
    }
    const lastPage = Math.ceil(count / Number(perPage));
    return {
      message: 'Berhasil mendapatkan data',
      data: res,
      meta: {
        total: count,
        totalPage: Math.ceil(count / Number(perPage)),
        lastPage,
        currentPage: Number(page),
        perPage: Number(perPage),
        prev: Number(page) > 1 ? Number(page) - 1 : null,
        next: Number(page) < lastPage ? Number(page) + 1 : null,
      },
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
      throw new BadRequestException('Gagal update role');
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
