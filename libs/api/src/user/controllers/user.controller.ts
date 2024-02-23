import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services';
import { AccessGuard } from '../../common';
import {
  THeaderRequest,
  TPaginationRequest,
  TUserRequest,
} from '@psu/entities';

@Controller('user')
@UseGuards(AccessGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getProfile(@Request() request: THeaderRequest) {
    const {
      user: { sub: id },
    } = request;
    return await this.userService.findOne(id);
  }

  @Patch('/me')
  async updateProfile(
    @Request() request: THeaderRequest,
    @Body() data: TUserRequest
  ) {
    const {
      user: { sub: id },
    } = request;
    return await this.userService.update({ id, ...data });
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get()
  async findMany(@Query() request: TPaginationRequest) {
    return await this.userService.findMany(request);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: TUserRequest) {
    return await this.userService.update({ id, ...data });
  }

  @Post()
  async create(@Body() data: TUserRequest) {
    return await this.userService.create(data);
  }
}
