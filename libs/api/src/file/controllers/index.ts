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
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
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
