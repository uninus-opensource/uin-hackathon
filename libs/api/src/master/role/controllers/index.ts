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
import { TRoleRequest } from '@psu/entities';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RoleDto } from '../../../common';
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.roleService.findOne(id);
  }

  @Get()
  async findMany() {
    return await this.roleService.findMany();
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.roleService.delete(id);
  }

  @ApiBody({ type: RoleDto })
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: TRoleRequest) {
    return await this.roleService.update({ id, ...data });
  }
  @ApiBody({ type: RoleDto })
  @Post()
  async create(@Body() data: TRoleRequest) {
    return await this.roleService.create(data);
  }
}
