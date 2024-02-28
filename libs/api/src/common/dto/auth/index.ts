import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  public email!: string;

  @ApiProperty({
    example: 'Test1234',
    description: 'Password minimal 8 karakter, terdapat huruf besar dan angka',
  })
  public password!: string;
}

export class RegisterDto {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  public email!: string;

  @ApiProperty({
    example: 'Jhon',
  })
  public fullname!: string;

  @ApiProperty()
  public nim!: string;

  @ApiProperty({
    example: 'Test1234',
    description: 'Password minimal 8 karakter, terdapat huruf besar dan angka',
  })
  public password!: string;

  @ApiProperty({ required: false, type: 'string', format: 'uuid' })
  public organizationId!: string;
}

export class RefreshDto {
  @ApiProperty()
  public refreshToken!: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'test@gmail.com',
  })
  public email!: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example: 'Test1234',
    description: 'Password minimal 8 karakter, terdapat huruf besar dan angka',
  })
  public password!: string;

  @ApiProperty()
  public accessToken!: string;
}
