import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ActivityService } from '../services';
import { AccessGuard, ActivityDto } from '../../common';
import {
  EActivityStatusTranslation,
  EChartType,
  EMonthNames,
  EPaginationOrderBy,
  TActivityRequest,
  THeaderRequest,
  TPaginationRequest,
  VSCreateActivity,
  VSUpdateActivity,
} from '@psu/entities';
import { ZodValidationPipe } from '../../common/pipes/';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
@ApiTags('Activity')
@Controller('activity')
@UseGuards(AccessGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiQuery({ name: 'type', enum: EChartType, required: false })
  @ApiQuery({
    name: 'status',
    enum: [
      EActivityStatusTranslation.REQUESTED,
      EActivityStatusTranslation.REJECTED,
      EActivityStatusTranslation.APPROVED,
    ],
    required: false,
  })
  @Get('chart')
  async chart(
    @Request() request: THeaderRequest,
    @Query('type') type: EChartType,
    @Query('status')
    status:
      | EActivityStatusTranslation.REQUESTED
      | EActivityStatusTranslation.REJECTED
      | EActivityStatusTranslation.APPROVED,
    @Query('month') month: EMonthNames
  ) {
    return await this.activityService.chart({
      type,
      status,
      month,
      organizationId: request.user.organizationId,
    });
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.activityService.findOne(id);
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  @ApiQuery({ name: 'orderBy', enum: EPaginationOrderBy, required: false })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  async findMany(@Query() request: TPaginationRequest) {
    return await this.activityService.findMany(request);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.activityService.delete(id);
  }

  @ApiBody({ type: ActivityDto })
  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(VSUpdateActivity)) data: TActivityRequest
  ) {
    return await this.activityService.update({ id, ...data });
  }

  @ApiBody({ type: ActivityDto })
  @Post()
  async create(
    @Body(new ZodValidationPipe(VSCreateActivity)) data: TActivityRequest
  ) {
    return await this.activityService.create(data);
  }
}
