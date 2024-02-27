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
  TOrganizationFindRequest,
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

  async findMany(
    data: TOrganizationFindRequest
  ): Promise<TOrganizationResponse> {
    const {
      page = 1,
      perPage = 10,
      orderBy,
      search,
      organizationType,
      organizationLevel,
    } = data;
    const orderByFunction = orderBy == EPaginationOrderBy.DESC ? desc : asc;

    const [res, count] = await Promise.all([
      this.drizzle
        .select({
          id: schema.organizations.id,
          name: schema.organizations.name,
          organizationType: schema.organizations.organizationType,
          organizationLevel: schema.organizations.organizationLevel,
          createdAt: schema.organizations.createdAt,
          updatedAt: schema.organizations.updatedAt,
        })
        .from(schema.organizations)
        .where(
          and(
            ...(organizationType
              ? [eq(schema.organizations.organizationType, organizationType)]
              : []),
            ...(organizationLevel
              ? [eq(schema.organizations.organizationLevel, organizationLevel)]
              : []),
            ...(search ? [ilike(schema.organizations.name, `%${search}%`)] : [])
          )
        )
        .limit(Number(perPage))
        .offset((Number(page) - 1) * Number(perPage))
        .orderBy(orderByFunction(schema.organizations.name)),

      this.drizzle
        .select({
          id: schema.organizations.id,
        })
        .from(schema.organizations)
        .where(
          and(
            ...(organizationType
              ? [eq(schema.organizations.organizationType, organizationType)]
              : []),
            ...(organizationLevel
              ? [eq(schema.organizations.organizationLevel, organizationLevel)]
              : []),
            ...(search ? [ilike(schema.organizations.name, `%${search}%`)] : [])
          )
        )
        .then((res) => res.length),
    ]);

    if (!res) {
      throw new NotFoundException('Organisasi tidak tersedia');
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
        organizationType: organizationType as string,
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
      throw new BadRequestException('Gagal update Organisasi');
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
        organizationType: organizationType as string,
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
