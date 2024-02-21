import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivityService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
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
