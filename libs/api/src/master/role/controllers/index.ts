import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from '../services';
import { TRoleRequest, VSCreateRole, VSUpdateRole } from '@psu/entities';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RoleDto } from '../../../common';
import { ZodValidationPipe } from '../../../common';
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async findMany() {
    return await this.roleService.findMany();
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
