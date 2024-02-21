import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
@Injectable()
export class AuthService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>
  ) {}
  async findOne() {
    try {
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findMany() {
    try {
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async delete() {
    try {
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async update() {
    try {
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async create() {
    try {
      return;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
