import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import {
  TPaginationRequest,
  TProposalRequest,
  TProposalResponse,
  TProposalSingleResponse,
} from '@psu/entities';

@Injectable()
export class ProposalService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}
  async findOne(id: string): Promise<TProposalSingleResponse> {
    const res = await this.drizzle
      .select({
        id: schema.proposals.id,
      })
      .from(schema.proposals)

      .where(eq(schema.proposals.id, id))
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      message: 'Berhasil mengambil data',
      data: res,
    };
  }
  async findMany(data: TPaginationRequest): Promise<TProposalResponse> {
    const res = await this.drizzle
      .select({
        id: schema.proposals.id,
      })
      .from(schema.proposals);

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      data: res,
      meta: {
        total: 0,
        lastPage: 0,
        currentPage: 0,
        perPage: 0,
        prev: null,
        next: null,
      },
    };
  }
  async delete(id: string): Promise<TProposalSingleResponse> {
    const res = await this.drizzle
      .delete(schema.proposals)
      .where(eq(schema.proposals.id, id))
      .returning({
        id: schema.proposals.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      message: 'Berhasil menghapus proposal',
      data: res,
    };
  }
  async update(data: TProposalRequest): Promise<TProposalSingleResponse> {
    const { id, ...resData } = data;
    const res = await this.drizzle
      .update(schema.proposals)
      .set(resData)
      .where(eq(schema.proposals.id, id as string))
      .returning({
        id: schema.proposals.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      message: 'Berhasil update proposal',
      data: res,
    };
  }
  async create(data: TProposalRequest): Promise<TProposalSingleResponse> {
    const res = await this.drizzle
      .insert(schema.proposals)
      .values(data)
      .returning({
        id: schema.proposals.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      message: 'Berhasil delete proposal',
      data: res,
    };
  }
}
