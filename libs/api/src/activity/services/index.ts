import { NotFoundException } from '@nestjs/common';
import * as schema from '../../common/models';
import { and, asc, desc, eq, ilike } from 'drizzle-orm';
import {
  EPaginationOrderBy,
  TActivityRequest,
  TActivityResponse,
  TActivitySingleResponse,
  TPaginationRequest,
} from '@psu/entities';
import { dbConnection } from '../../drizzle';

const db = dbConnection;

export const activityService = {
  findOne: async (id: string): Promise<TActivitySingleResponse> => {
    const res = await db
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
  },
  findMany: async (data: TPaginationRequest): Promise<TActivityResponse> => {
    const { page = 1, perPage = 10, orderBy, search } = data;
    const orderByFunction = orderBy == EPaginationOrderBy.DESC ? desc : asc;
    const [res, count] = await Promise.all([
      db
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
      db
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
  },
  delete: async (id: string): Promise<TActivitySingleResponse> => {
    const res = await db
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
  },
  update: async (data: TActivityRequest): Promise<TActivitySingleResponse> => {
    const { id, ...resdata } = data;
    const res = await db
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
  },
  create: async (data: TActivityRequest): Promise<TActivitySingleResponse> => {
    const res = await db
      .insert(schema.activities)
      .values({
        name: data.name as string,
        lead: data.lead as string,
        proposal: data.proposal as string,
        description: data.description as string,
        location: data.location as string,
        startDate: data.startDate as Date,
        endDate: data.endDate as Date,
        budget: data.budget as string,
        applicantId: data.applicantId as string,
        reviewers: [],
      })
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
  },
};
