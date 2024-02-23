import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProposalService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}
  async findOne(id: string) {
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
    return res;
  }
  async findMany(data: any) {
    const res = await this.drizzle
      .select({
        id: schema.proposals.id,
      })
      .from(schema.proposals);

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async delete(id: string) {
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
    return res;
  }
  async update(data: any) {
    const { id, ...resData } = data;
    const res = await this.drizzle
      .update(schema.proposals)
      .set(resData)
      .where(eq(schema.proposals.id, id))
      .returning({
        id: schema.proposals.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async create(data: any) {
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
  }
}
