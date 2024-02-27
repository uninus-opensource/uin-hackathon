import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FacultyService } from '../services';
import {
  TFacultyRequest,
  VSCreateFaculty,
  VSUpdateFaculty,
} from '@psu/entities';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { FacultyDto, ZodValidationPipe } from '../../../common';
@ApiTags('Faculty')
@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Get()
  async findMany() {
    return await this.facultyService.findMany();
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
