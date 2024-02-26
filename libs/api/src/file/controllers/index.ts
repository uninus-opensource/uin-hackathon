import {
  BadRequestException,
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from '../services';
import { FileInterceptor } from '@nestjs/platform-express';
import { TFIle } from '@psu/entities';

import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 4000000,
        })
        .addFileTypeValidator({
          fileType: /(pdf)/g,
        })
        .build({
          exceptionFactory(error) {
            throw new BadRequestException(error);
          },
        })
    )
    file: TFIle
  ) {
    return await this.fileService.uploadFile({
      buffer: file.buffer,
      filename: file.originalname,
    });
  }
}
