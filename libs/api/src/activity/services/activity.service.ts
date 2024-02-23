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
export class ActivityService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}

  async findOne(id: string) {
    const res = await this.drizzle
      .select({
        id: schema.activities.id,
      })
      .from(schema.activities)

      .where(eq(schema.activities.id, id))
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async findMany(data: any) {
    const res = await this.drizzle
      .select({
        id: schema.activities.id,
      })
      .from(schema.activities);

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async delete(id: string) {
    const res = await this.drizzle
      .delete(schema.activities)
      .where(eq(schema.activities.id, id))
      .returning({
        id: schema.activities.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async update(data: any) {
    const { id, ...resdata } = data;
    const res = await this.drizzle
      .update(schema.activities)
      .set(resdata)
      .where(eq(schema.activities.id, id))
      .returning({
        id: schema.activities.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return res;
  }
  async create(data: any) {
    const res = await this.drizzle
      .insert(schema.activities)
      .values(data)
      .returning({
        id: schema.activities.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
  }
}
