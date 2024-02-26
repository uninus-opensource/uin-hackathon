import { ApiProperty } from '@nestjs/swagger';

export class ActivityDto {
  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public lead!: string;

  @ApiProperty()
  public proposal!: string;

  @ApiProperty()
  public description!: string;

  @ApiProperty()
  public location!: string;

  @ApiProperty()
  public startDate!: Date;

  @ApiProperty()
  public endDate!: Date;

  @ApiProperty()
  public budget!: string;

  @ApiProperty({ isArray: true })
  public reviewers!: string[];
}
