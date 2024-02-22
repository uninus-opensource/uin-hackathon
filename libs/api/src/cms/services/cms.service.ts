import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
@Injectable()
export class CMSService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}

  async findOne() {
    return;
  }

  async findMany() {
    return;
  }
  async delete() {
    return;
  }
  async update() {
    return;
  }
  async create() {
    return;
  }
}
