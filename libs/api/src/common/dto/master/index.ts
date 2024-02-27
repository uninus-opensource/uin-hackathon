import { ApiProperty } from '@nestjs/swagger';
import { EPermission } from '@psu/entities';

export class RoleDto {
  @ApiProperty()
  public name!: string;

  @ApiProperty({ isArray: true, type: [EPermission] })
  public permissions!: EPermission[];
}

export class OrganizationDto {
  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public organizationType!: string;

  @ApiProperty()
  public organizationLevel!: string;
}

export class FacultyDto {
  @ApiProperty()
  public name!: string;
}

export class DepartmentDto {
  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public facultyId!: string;
}
