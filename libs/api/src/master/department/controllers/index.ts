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
import { DepartmentService } from '../services';
import {
  EPaginationOrderBy,
  TDepartmentRequest,
  TPaginationRequest,
  VSCreateDepartment,
  VSUpdateDepartment,
} from '@psu/entities';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { DepartmentDto, ZodValidationPipe } from '../../../common';
@ApiTags('Master:Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'orderBy', enum: EPaginationOrderBy, required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({
    name: 'facultyId',
    required: false,
  })
  @Get()
  async findMany(@Query() request: TPaginationRequest) {
    return await this.departmentService.findMany(request);
  }

  @ApiBody({ type: DepartmentDto })
  @Post()
  async create(
    @Body(new ZodValidationPipe(VSCreateDepartment)) data: TDepartmentRequest
  ) {
    return await this.departmentService.create(data);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.departmentService.findOne(id);
  }

  @ApiBody({ type: DepartmentDto })
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateDepartment)) data: TDepartmentRequest
  ) {
    return await this.departmentService.update({ id, ...data });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.departmentService.delete(id);
  }
}
