import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, asc, desc, eq, ilike } from 'drizzle-orm';
import {
  EPaginationOrderBy,
  TActivityRequest,
  TActivityResponse,
  TActivitySingleResponse,
  TPaginationRequest,
} from '@psu/entities';

@Injectable()
export class ActivityService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}

  async findOne(id: string): Promise<TActivitySingleResponse> {
    const res = await this.drizzle
      .select({
        id: schema.activities.id,
      })
      .from(schema.activities)

      .where(eq(schema.activities.id, id))
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('Kegiatan tidak ditemukan');
    }
    return {
      message: 'Berhasil mengambil data kegiatan',
      data: res,
    };
  }
  async findMany(data: TPaginationRequest): Promise<TActivityResponse> {
    const { page = 1, perPage = 10, orderBy, search } = data;
    const orderByFunction = orderBy == EPaginationOrderBy.DESC ? desc : asc;
    const [res, count] = await Promise.all([
      this.drizzle
        .select({
          id: schema.activities.id,
        })
        .from(schema.activities)
        .where(
          and(...(search ? [ilike(schema.activities.name, `%${search}%`)] : []))
        )
        .limit(Number(perPage))
        .offset((Number(page) - 1) * Number(perPage))
        .orderBy(orderByFunction(schema.activities.name)),
      this.drizzle
        .select({
          id: schema.activities.id,
        })
        .from(schema.activities)
        .where(
          and(...(search ? [ilike(schema.activities.name, `%${search}%`)] : []))
        )
        .then((res) => res.length),
    ]);

    if (!res) {
      throw new NotFoundException('Kegiatan tidak ditemukan');
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
  async delete(id: string): Promise<TActivitySingleResponse> {
    const res = await this.drizzle
      .delete(schema.activities)
      .where(eq(schema.activities.id, id))
      .returning({
        id: schema.activities.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('Kegiatan tidak ditemukan');
    }
    return {
      message: 'Berhasil menghapus kegiatan',
      data: res,
    };
  }
  async update(data: TActivityRequest): Promise<TActivitySingleResponse> {
    const { id, ...resdata } = data;
    const res = await this.drizzle
      .update(schema.activities)
      .set(resdata)
      .where(eq(schema.activities.id, id as string))
      .returning({
        id: schema.activities.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('Kegiatan tidak ditemukan');
    }
    return {
      message: 'Berhasil update kegiatan',
      data: res,
    };
  }
  async create(data: TActivityRequest): Promise<TActivitySingleResponse> {
    const res = await this.drizzle
      .insert(schema.activities)
      .values(data)
      .returning({
        id: schema.activities.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('Kegiatan tidak ditemukan');
    }
    return {
      message: 'Berhasil menambahkan kegiatan',
      data: res,
    };
  }
}
