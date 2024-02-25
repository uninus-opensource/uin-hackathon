import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { and, asc, desc, eq, gte, ilike, lt } from 'drizzle-orm';
import {
  EActivityStatus,
  EActivityStatusTranslation,
  EChartType,
  EPaginationOrderBy,
  TActivityRequest,
  TActivityResponse,
  TActivitySingleResponse,
  TChartResponse,
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
      .values({
        name: data.name as string,
        lead: data.lead as string,
        proposal: data.proposal as string,
        description: data.description as string,
        location: data.location as string,
        startDate: data.startDate as Date,
        endDate: data.endDate as Date,
        budget: data.budget as string,
        organizationId: data.organizationId as string,
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
  }

  async chart(data: {
    type: string;
    status: string;
    month: string;
    organizationId?: string;
  }): Promise<TChartResponse> {
    const { type = EChartType.PIE, status, month, organizationId } = data;

    if (type === EChartType.LINE && organizationId) {
      // const [requested, approved, rejected] = await Promise.all([
      //   Promise.all([]),
      //   Promise.all([]),
      //   Promise.all([]),
      // ]);
      return {
        type: EChartType.LINE,
        labels: ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'],
        datasets: [
          {
            label: EActivityStatusTranslation.REQUESTED,
            backgroundColor: '#AFFFD4',
            borderColor: '#AFFFD4',
            pointBackgroundColor: '#AFFFD4',
            pointBorderColor: '#02E56D',
            pointBorderWidth: 2,
            data: [20, 10, 5, 15],
            tention: 0.2,
          },
          {
            label: EActivityStatusTranslation.APPROVED,
            backgroundColor: '#FFF986',
            borderColor: '#FFF986',
            pointBorderColor: '#F8BF02',
            pointBorderWidth: 2,
            data: [5, 10, 12, 7],
            pointBackgroundColor: '#FFF986',
            fill: false,
            tention: 0.2,
          },
          {
            label: EActivityStatusTranslation.REJECTED,
            backgroundColor: '#FFF986',
            borderColor: '#FFF986',
            pointBorderColor: '#F8BF02',
            pointBorderWidth: 2,
            data: [5, 10, 12, 7],
            pointBackgroundColor: '#FFF986',
            fill: false,
            tention: 0.2,
          },
        ],
      };
    }

    if (type === EChartType.PIE && organizationId) {
      const now = new Date();
      const curentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const startMonth = new Date(curentYear, currentMonth);
      const nextMonth = new Date(curentYear, currentMonth + 1);
      const [ongoing, notReported, reported] = await Promise.all([
        this.drizzle
          .select({
            id: schema.activities.id,
          })
          .from(schema.activities)
          .where(
            and(
              eq(
                schema.activities.status,
                EActivityStatus.APPROVEDBYCHANCELLOR
              ),
              eq(schema.activities.organizationId, organizationId as string),
              gte(schema.activities.updatedAt, startMonth),
              lt(schema.activities.updatedAt, nextMonth)
            )
          )
          .then((res) => res.length),

        this.drizzle
          .select({
            id: schema.activities.id,
          })
          .from(schema.activities)
          .where(
            and(
              eq(schema.activities.status, EActivityStatus.NOTREPORTED),
              eq(schema.activities.organizationId, organizationId as string),
              gte(schema.activities.updatedAt, startMonth),
              lt(schema.activities.updatedAt, nextMonth)
            )
          )
          .then((res) => res.length),

        this.drizzle
          .select({
            id: schema.activities.id,
          })
          .from(schema.activities)
          .where(
            and(
              eq(schema.activities.status, EActivityStatus.REPORTED),
              eq(schema.activities.organizationId, organizationId as string),
              gte(schema.activities.updatedAt, startMonth),
              lt(schema.activities.updatedAt, nextMonth)
            )
          )
          .then((res) => res.length),
      ]);

      return {
        type: EChartType.PIE,
        labels: [
          EActivityStatusTranslation.ONGOING,
          EActivityStatusTranslation.NOTREPORTED,
          EActivityStatusTranslation.REPORTED,
        ],
        datasets: [
          {
            label: 'Laporan Kegiatan',
            data: [ongoing, notReported, reported],
            backgroundColor: ['#1B81F7', '#FFB800', '34B337'],
            hoverOffset: 4,
          },
        ],
      };
    }

    return {
      message: 'Data tidak tersedia',
    };
  }
}
