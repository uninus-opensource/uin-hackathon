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
  VSCreateOrganization,
  VSUpdateOrganization,
} from '@psu/entities';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { OrganizationDto, ZodValidationPipe } from '../../../common';
@ApiTags('Organization')
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

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

  @ApiBody({ type: OrganizationDto })
  @Post()
  async create(
    @Body(new ZodValidationPipe(VSCreateOrganization))
    data: TOrganizationRequest
  ) {
    return await this.organizationService.create(data);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.organizationService.findOne(id);
  }

  @ApiBody({ type: OrganizationDto })
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateOrganization))
    data: TOrganizationRequest
  ) {
    return await this.organizationService.update({ id, ...data });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.organizationService.delete(id);
  }
}
