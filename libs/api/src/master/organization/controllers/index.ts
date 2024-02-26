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
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { OrganizationDto } from '../../../common';
@ApiTags('Organization')
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

  @ApiBody({ type: OrganizationDto })
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: TOrganizationRequest) {
    return await this.organizationService.update({ id, ...data });
  }

  @ApiBody({ type: OrganizationDto })
  @Post()
  async create(@Body() data: TOrganizationRequest) {
    return await this.organizationService.create(data);
  }
}
