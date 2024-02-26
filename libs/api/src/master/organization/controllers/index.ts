import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrganizationService } from '../services';
import {
  EorganizationLevel,
  EorganizationType,
  TOrganizationFindRequest,
  TOrganizationRequest,
} from '@psu/entities';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { OrganizationDto } from '../../../common';
@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.organizationService.findOne(id);
  }

  @ApiQuery({
    name: 'organizationType',
    enum: EorganizationType,
    required: false,
  })
  @ApiQuery({
    name: 'organizationLevel',
    enum: EorganizationLevel,
    required: false,
  })
  @Get()
  async findMany(@Query() request: TOrganizationFindRequest) {
    return await this.organizationService.findMany(request);
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
