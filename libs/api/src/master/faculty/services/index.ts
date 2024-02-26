import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../../common/models';
import { and, eq } from 'drizzle-orm';
import {
  TFacultyRequest,
  TFacultyResponse,
  TFacultySingleResponse,
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

  async findMany(): Promise<TFacultyResponse> {
    const res = await this.drizzle
      .select({
        id: schema.faculty.id,
        name: schema.faculty.name,
        createdAt: schema.faculty.createdAt,
        updatedAt: schema.faculty.updatedAt,
      })
      .from(schema.faculty);

    if (!res) {
      throw new NotFoundException('Fakultas tidak tersedia');
    }
    return {
      message: 'Berhasil mendapatkan data',
      data: res,
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
