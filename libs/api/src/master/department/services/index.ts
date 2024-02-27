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
  TDepartmentRequest,
  TDepartmentResponse,
  TDepartmentSingleResponse,
  TPaginationRequest,
} from '@psu/entities';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}
  async findOne(id: string): Promise<TDepartmentSingleResponse> {
    const res = await this.drizzle
      .select({
        id: schema.department.id,
        name: schema.department.name,
        createdAt: schema.department.createdAt,
        updatedAt: schema.department.updatedAt,
      })
      .from(schema.department)
      .where(eq(schema.department.id, id))
      .then((res) => res.at(0));
    if (!res) {
      throw new NotFoundException('Prodi tidak ditemukan');
    }
    return {
      message: 'Berhasil mendapatkan data',
      data: res,
    };
  }

  async findMany(data: TPaginationRequest): Promise<TDepartmentResponse> {
    const { facultyId, page = 1, perPage = 10, orderBy, search } = data;
    const orderByFunction = orderBy == EPaginationOrderBy.DESC ? desc : asc;
    const [res, count] = await Promise.all([
      this.drizzle
        .select({
          id: schema.department.id,
          name: schema.department.name,
          createdAt: schema.department.createdAt,
          updatedAt: schema.department.updatedAt,
        })
        .from(schema.department)
        .where(
          and(
            ...(facultyId ? [eq(schema.department.facultyId, facultyId)] : []),
            ...(search ? [ilike(schema.department.name, `%${search}%`)] : [])
          )
        )
        .limit(Number(perPage))
        .offset((Number(page) - 1) * Number(perPage))
        .orderBy(orderByFunction(schema.department.name)),

      this.drizzle
        .select({
          id: schema.department.id,
          name: schema.department.name,
          createdAt: schema.department.createdAt,
          updatedAt: schema.department.updatedAt,
        })
        .from(schema.department)
        .where(
          and(
            ...(facultyId ? [eq(schema.department.facultyId, facultyId)] : []),
            ...(search ? [ilike(schema.department.name, `%${search}%`)] : [])
          )
        )
        .then((res) => res.length),
    ]);

    if (!res) {
      throw new NotFoundException('Prodi tidak tersedia');
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

  async delete(id: string): Promise<TDepartmentSingleResponse> {
    const res = await this.drizzle
      .delete(schema.department)
      .where(eq(schema.department.id, id))
      .returning({
        id: schema.department.id,
        name: schema.department.name,
        createdAt: schema.department.createdAt,
        updatedAt: schema.department.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new NotFoundException('Prodi tidak ditemukan');
    }
    return {
      message: 'Berhasil mengahapus data',
      data: res,
    };
  }

  async update(data: TDepartmentRequest): Promise<TDepartmentSingleResponse> {
    const { id, name, facultyId } = data;
    const res = await this.drizzle
      .update(schema.department)
      .set({
        name,
        facultyId,
        updatedAt: new Date(),
      })
      .where(eq(schema.department.id, id as string))
      .returning({
        id: schema.department.id,
        name: schema.department.name,
        createdAt: schema.department.createdAt,
        updatedAt: schema.department.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new BadRequestException('Gagal update Prodi');
    }

    return {
      message: 'Berhasil update data',
      data: res,
    };
  }

  async create(data: TDepartmentRequest): Promise<TDepartmentSingleResponse> {
    const { name, facultyId } = data;
    const res = await this.drizzle
      .insert(schema.department)
      .values({
        name: name as string,
        facultyId,
      })
      .returning({
        id: schema.department.id,
        name: schema.department.name,
        createdAt: schema.department.createdAt,
        updatedAt: schema.department.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new BadRequestException('Gagal menambahkan Prodi');
    }

    return {
      message: 'Berhasil menambahkan data',
      data: res,
    };
  }
}
