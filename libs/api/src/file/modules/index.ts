import { Module } from '@nestjs/common';

import { FileController } from '../controllers';
import { FileService } from '../services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
