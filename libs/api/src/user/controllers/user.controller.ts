import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services';
import { AccessGuard } from '../../common';

@Controller('user')
@UseGuards(AccessGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getProfile() {
    return await this.userService.findOne();
  }

  @Post('/me')
  async updateProfile() {
    return await this.userService.update();
  }

  @Get('/:id')
  async findOne() {
    return await this.userService.findOne();
  }

  @Get()
  async findMany() {
    return await this.userService.findMany();
  }

  @Delete('/:id')
  async delete() {
    return await this.userService.delete();
  }

  @Patch('/:id')
  async update() {
    return await this.userService.update();
  }

  @Post()
  async create() {
    return await this.userService.create();
  }
}
