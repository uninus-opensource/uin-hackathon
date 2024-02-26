import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty()
  public name!: string;

  @ApiProperty({ isArray: true })
  public permissions!: string[];
}

export class OrganizationDto {
  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public organizationType!: string;

  @ApiProperty()
  public organizationLevel!: string;
}
