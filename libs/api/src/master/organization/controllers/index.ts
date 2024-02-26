import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrganizationService } from '../services';
import { TOrganizationRequest } from '@psu/entities';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.organizationService.findOne(id);
  }

  @Get()
  async findMany() {
    return await this.organizationService.findMany();
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.organizationService.delete(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: TOrganizationRequest) {
    return await this.organizationService.update({ id, ...data });
  }

  @Post()
  async create(@Body() data: TOrganizationRequest) {
    return await this.organizationService.create(data);
  }
}
