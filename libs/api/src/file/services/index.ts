import { BadRequestException, Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { ConfigService } from '@nestjs/config';
import { TFileUploadRequest, TFileUploadResponse } from '@psu/entities';
@Injectable()
export class FileService {
  private bucket = this.configService.getOrThrow('AWS_BUCKET');
  private region = this.configService.getOrThrow('AWS_REGION');
  private readonly s3Client = new S3Client({
    region: this.region,
    credentials: {
      accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY'),
      secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async uploadFile(data: TFileUploadRequest): Promise<TFileUploadResponse> {
    const body = Buffer.from(data.buffer);
    const key = `${Date.now().toString() + data.filename.replace(/ /g, '-')}`;
    try {
      await this.uploadToS3({ key, body });
      return {
        path: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async uploadToS3(data: { key: string; body: Buffer }) {
    try {
      await new Upload({
        client: this.s3Client,
        params: {
          ACL: 'public-read',
          Bucket: this.bucket,
          Key: data.key,
          Body: data.body,
        },
        tags: [],
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
        leavePartsOnError: false,
      }).done();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
