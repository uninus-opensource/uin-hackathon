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
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
  async findOne() {
    try {
      const res = await this.drizzle
        .select({
          id: schema.activities.id,
        })
        .from(schema.activities)

        .where(eq(schema.activities.id, ''))
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
          id: schema.activities.id,
        })
        .from(schema.activities);

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
        .delete(schema.activities)
        .where(eq(schema.activities.id, ''))
        .returning({
          id: schema.activities.id,
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
        .update(schema.activities)
        .set({
          name: '',
        })
        .where(eq(schema.activities.id, ''))
        .returning({
          id: schema.activities.id,
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
        .insert(schema.activities)
        .values({
          name: 'test',
        })
        .returning({
          id: schema.activities.id,
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
