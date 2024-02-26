import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  public fullname!: string;

  @ApiProperty()
  public email!: string;

  @ApiProperty()
  public roleId!: string;

  @ApiProperty()
  public avatar!: string;

  @ApiProperty()
  public password!: string;

  @ApiProperty()
  public organizationId!: string;

  @ApiProperty()
  public facultyId!: string;

  @ApiProperty()
  public departmentId!: string;
}

export class ProfileDto {
  @ApiProperty()
  public fullname!: string;
}

export class UserFindByEmailDto {
  @ApiProperty()
  public email!: string;
}
