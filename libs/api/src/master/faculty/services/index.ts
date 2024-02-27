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
  TFacultyRequest,
  TFacultyResponse,
  TFacultySingleResponse,
  TPaginationRequest,
} from '@psu/entities';

@Injectable()
export class FacultyService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}
  async findOne(id: string): Promise<TFacultySingleResponse> {
    const res = await this.drizzle
      .select({
        id: schema.faculty.id,
        name: schema.faculty.name,
        createdAt: schema.faculty.createdAt,
        updatedAt: schema.faculty.updatedAt,
      })
      .from(schema.faculty)
      .where(eq(schema.faculty.id, id))
      .then((res) => res.at(0));
    if (!res) {
      throw new NotFoundException('Fakultas tidak ditemukan');
    }
    return {
      message: 'Berhasil mendapatkan data',
      data: res,
    };
  }

  async findMany(data: TPaginationRequest): Promise<TFacultyResponse> {
    const { page = 1, perPage = 10, orderBy, search } = data;
    const orderByFunction = orderBy == EPaginationOrderBy.DESC ? desc : asc;
    const [res, count] = await Promise.all([
      this.drizzle
        .select({
          id: schema.faculty.id,
          name: schema.faculty.name,
          createdAt: schema.faculty.createdAt,
          updatedAt: schema.faculty.updatedAt,
        })
        .from(schema.faculty)
        .where(
          and(...(search ? [ilike(schema.faculty.name, `%${search}%`)] : []))
        )
        .limit(Number(perPage))
        .offset((Number(page) - 1) * Number(perPage))
        .orderBy(orderByFunction(schema.faculty.name)),

      this.drizzle
        .select({
          id: schema.faculty.id,
        })
        .from(schema.faculty)
        .where(
          and(...(search ? [ilike(schema.faculty.name, `%${search}%`)] : []))
        )
        .then((res) => res.length),
    ]);

    if (!res) {
      throw new NotFoundException('Fakultas tidak tersedia');
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

  async delete(id: string): Promise<TFacultySingleResponse> {
    const res = await this.drizzle
      .delete(schema.faculty)
      .where(eq(schema.faculty.id, id))
      .returning({
        id: schema.faculty.id,
        name: schema.faculty.name,
        createdAt: schema.faculty.createdAt,
        updatedAt: schema.faculty.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new NotFoundException('Fakultas tidak ditemukan');
    }
    return {
      message: 'Berhasil mengahapus data',
      data: res,
    };
  }

  async update(data: TFacultyRequest): Promise<TFacultySingleResponse> {
    const { id, name } = data;
    const res = await this.drizzle
      .update(schema.faculty)
      .set({
        name,
        updatedAt: new Date(),
      })
      .where(eq(schema.faculty.id, id as string))
      .returning({
        id: schema.faculty.id,
        name: schema.faculty.name,
        createdAt: schema.faculty.createdAt,
        updatedAt: schema.faculty.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new BadRequestException('Gagal update Fakultas');
    }

    return {
      message: 'Berhasil update data',
      data: res,
    };
  }

  async create(data: TFacultyRequest): Promise<TFacultySingleResponse> {
    const { name } = data;
    const res = await this.drizzle
      .insert(schema.faculty)
      .values({
        name: name as string,
      })
      .returning({
        id: schema.faculty.id,
        name: schema.faculty.name,
        createdAt: schema.faculty.createdAt,
        updatedAt: schema.faculty.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new BadRequestException('Gagal menambahkan Fakultas');
    }

    return {
      message: 'Berhasil menambahkan data',
      data: res,
    };
  }
}
