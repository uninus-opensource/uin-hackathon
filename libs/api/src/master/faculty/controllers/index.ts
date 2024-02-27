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
import { FacultyService } from '../services';
import {
  EPaginationOrderBy,
  TFacultyRequest,
  TPaginationRequest,
  VSCreateFaculty,
  VSUpdateFaculty,
} from '@psu/entities';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { FacultyDto, ZodValidationPipe } from '../../../common';
@ApiTags('Master:Faculty')
@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'orderBy', enum: EPaginationOrderBy, required: false })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  async findMany(@Query() query: TPaginationRequest) {
    return await this.facultyService.findMany(query);
  }

  @ApiBody({ type: FacultyDto })
  @Post()
  async create(
    @Body(new ZodValidationPipe(VSCreateFaculty)) data: TFacultyRequest
  ) {
    return await this.facultyService.create(data);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.facultyService.findOne(id);
  }

  @ApiBody({ type: FacultyDto })
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateFaculty)) data: TFacultyRequest
  ) {
    return await this.facultyService.update({ id, ...data });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.facultyService.delete(id);
  }
}
