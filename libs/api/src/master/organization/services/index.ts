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
  TOrganizationRequest,
  TOrganizationResponse,
  TOrganizationSingleResponse,
} from '@psu/entities';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}
  async findOne(id: string): Promise<TOrganizationSingleResponse> {
    const res = await this.drizzle
      .select({
        id: schema.organizations.id,
        name: schema.organizations.name,
        organizationType: schema.organizations.organizationType,
        organizationLevel: schema.organizations.organizationLevel,
        createdAt: schema.organizations.createdAt,
        updatedAt: schema.organizations.updatedAt,
      })
      .from(schema.organizations)
      .where(eq(schema.organizations.id, id))
      .then((res) => res.at(0));
    if (!res) {
      throw new NotFoundException('Organisasi tidak ditemukan');
    }
    return {
      message: 'Berhasil mendapatkan data',
      data: res,
    };
  }

  async findMany(): Promise<TOrganizationResponse> {
    const res = await this.drizzle
      .select({
        id: schema.organizations.id,
        name: schema.organizations.name,
        organizationType: schema.organizations.organizationType,
        organizationLevel: schema.organizations.organizationLevel,
        createdAt: schema.organizations.createdAt,
        updatedAt: schema.organizations.updatedAt,
      })
      .from(schema.organizations);
    if (!res) {
      throw new NotFoundException('Organisasi tidak tersedia');
    }
    return {
      message: 'Berhasil mendapatkan data',
      data: res,
    };
  }

  async delete(id: string): Promise<TOrganizationSingleResponse> {
    const res = await this.drizzle
      .delete(schema.organizations)
      .where(eq(schema.organizations.id, id))
      .returning({
        id: schema.organizations.id,
        name: schema.organizations.name,
        organizationType: schema.organizations.organizationType,
        organizationLevel: schema.organizations.organizationLevel,
        createdAt: schema.organizations.createdAt,
        updatedAt: schema.organizations.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new NotFoundException('Organisasi tidak ditemukan');
    }
    return {
      message: 'Berhasil mengahapus data',
      data: res,
    };
  }

  async update(
    data: TOrganizationRequest
  ): Promise<TOrganizationSingleResponse> {
    const { id, name, organizationType, organizationLevel } = data;
    const res = await this.drizzle
      .update(schema.organizations)
      .set({
        name,
        organizationType,
        organizationLevel,
        updatedAt: new Date(),
      })
      .where(eq(schema.organizations.id, id as string))
      .returning({
        id: schema.organizations.id,
        name: schema.organizations.name,
        organizationType: schema.organizations.organizationType,
        organizationLevel: schema.organizations.organizationLevel,
        createdAt: schema.organizations.createdAt,
        updatedAt: schema.organizations.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new BadRequestException('Gagal menambahkan Organisasi');
    }

    return {
      message: 'Berhasil update data',
      data: res,
    };
  }

  async create(
    data: TOrganizationRequest
  ): Promise<TOrganizationSingleResponse> {
    const { name, organizationType, organizationLevel } = data;
    const res = await this.drizzle
      .insert(schema.organizations)
      .values({
        name: name as string,
        organizationType,
        organizationLevel,
      })
      .returning({
        id: schema.organizations.id,
        name: schema.organizations.name,
        organizationType: schema.organizations.organizationType,
        organizationLevel: schema.organizations.organizationLevel,
        createdAt: schema.organizations.createdAt,
        updatedAt: schema.organizations.updatedAt,
      })
      .then((res) => res.at(0));
    if (!res) {
      throw new BadRequestException('Gagal menambahkan Organisasi');
    }

    return {
      message: 'Berhasil menambahkan data',
      data: res,
    };
  }
}
