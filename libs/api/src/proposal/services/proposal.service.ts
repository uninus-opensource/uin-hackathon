import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProposalService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}
  async findOne() {
    try {
      const res = await this.drizzle
        .select({
          id: schema.proposals.id,
        })
        .from(schema.proposals)

        .where(eq(schema.proposals.id, 0))
        .then((res) => res.at(0));

      if (!res) {
        throw new NotFoundException('User tidak ditemukan');
      }
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findMany() {
    try {
      const res = await this.drizzle
        .select({
          id: schema.proposals.id,
        })
        .from(schema.proposals);

      if (!res) {
        throw new NotFoundException('User tidak ditemukan');
      }
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async delete() {
    try {
      const res = await this.drizzle
        .delete(schema.proposals)
        .where(eq(schema.proposals.id, 0))
        .returning({
          id: schema.proposals.id,
        })
        .then((res) => res.at(0));

      if (!res) {
        throw new NotFoundException('User tidak ditemukan');
      }
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async update() {
    try {
      const res = await this.drizzle
        .update(schema.proposals)
        .set({
          title: '',
        })
        .where(eq(schema.proposals.id, 0))
        .returning({
          id: schema.proposals.id,
        })
        .then((res) => res.at(0));

      if (!res) {
        throw new NotFoundException('User tidak ditemukan');
      }
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async create() {
    try {
      const res = await this.drizzle
        .insert(schema.proposals)
        .values({
          title: '',
        })
        .returning({
          id: schema.proposals.id,
        })
        .then((res) => res.at(0));

      if (!res) {
        throw new NotFoundException('User tidak ditemukan');
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
