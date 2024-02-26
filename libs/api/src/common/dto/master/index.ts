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

export class FacultyDto {
  @ApiProperty()
  public name!: string;
}

export class DepartmentDto {
  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public facultyI!: string;
}
