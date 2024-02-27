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
import { RoleService } from '../services';
import {
  EPaginationOrderBy,
  TPaginationRequest,
  TRoleRequest,
  VSCreateRole,
  VSUpdateRole,
} from '@psu/entities';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { RoleDto } from '../../../common';
import { ZodValidationPipe } from '../../../common';
@ApiTags('Master:Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'orderBy', enum: EPaginationOrderBy, required: false })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  async findMany(@Query() query: TPaginationRequest) {
    return await this.roleService.findMany(query);
  }

  @ApiBody({ type: RoleDto })
  @Post()
  async create(@Body(new ZodValidationPipe(VSCreateRole)) data: TRoleRequest) {
    return await this.roleService.create(data);
  }
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(id);
  }
  @ApiBody({ type: RoleDto })
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateRole)) data: TRoleRequest
  ) {
    return await this.roleService.update({ id, ...data });
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.roleService.delete(id);
  }
}
