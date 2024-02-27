import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as schema from '../../common/models';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, ilike } from 'drizzle-orm';
import {
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TRegisterResponse,
  TGoogleRequest,
  TJwtRequest,
  emailTemplate,
  TForgotPasswordResponse,
  TResetPasswordRequest,
  TResetPasswordResponse,
  TRefreshResponse,
} from '@psu/entities';
import {
  comparePassword,
  encryptPassword,
  generateAccessToken,
  generateRefreshToken,
} from '../../common';
import { EmailService } from '../../email';
import { UserService } from '../../user';

@Injectable()
export class AuthService {
  constructor(
    @Inject('drizzle') private drizzle: NodePgDatabase<typeof schema>,
    private readonly emailService: EmailService,
    private readonly userService: UserService
  ) {}
  async login(payload: TLoginRequest): Promise<TLoginResponse> {
    const { email, password } = payload;
    const res = await this.drizzle
      .select({
        id: schema.users.id,
        fullname: schema.users.fullname,
        email: schema.users.email,
        password: schema.users.password,
        organization: {
          id: schema.organizations.id,
          name: schema.organizations.name,
        },
        faculty: {
          id: schema.faculty.id,
          name: schema.faculty.name,
        },
        department: {
          id: schema.department.id,
          name: schema.department.name,
        },
        role: {
          id: schema.roles.id,
          name: schema.roles.name,
          permissions: schema.roles.permissions,
        },
      })
      .from(schema.users)
      .leftJoin(schema.roles, eq(schema.roles.id, schema.users.roleId))
      .leftJoin(
        schema.additional,
        eq(schema.additional.userId, schema.users.id)
      )
      .leftJoin(
        schema.organizations,
        eq(schema.additional.organizationId, schema.organizations.id)
      )
      .leftJoin(
        schema.faculty,
        eq(schema.additional.facultyId, schema.faculty.id)
      )
      .leftJoin(
        schema.department,
        eq(schema.additional.departmentId, schema.department.id)
      )
      .where(eq(schema.users.email, email))
      .then((res) => res.at(0));

    const isPasswordValid =
      res && comparePassword(password as string, res.password as string);

    if (!res || !isPasswordValid) {
      throw new UnauthorizedException('Email atau password tidak valid');
    }

    const [accessToken, refreshToken, expired] = await Promise.all([
      generateAccessToken({
        sub: res.id,
        email: res.email,
        fullname: res.fullname,
        organizationId: res?.organization?.id || '',
        facultyId: res?.faculty?.id || '',
        departmentId: res?.department?.id || '',
        role: {
          id: res.role?.id || '',
          name: res.role?.name || '',
          permissions: res.role?.permissions || [],
        },
      }),

      generateRefreshToken({
        sub: res.id,
        email: res.email,
        fullname: res.fullname,
        organizationId: res?.organization?.id || '',
        facultyId: res?.faculty?.id || '',
        departmentId: res?.department?.id || '',
        role: {
          id: res.role?.id || '',
          name: res.role?.name || '',
          permissions: res.role?.permissions || [],
        },
      }),
      (() => {
        const expiresIn = 15 * 60 * 1000;
        const now = Date.now();
        return now + expiresIn;
      })(),
    ]);

    return {
      id: res.id,
      token: {
        expired,
        refreshToken,
        accessToken,
      },
      user: {
        id: res.id,
        fullname: res.fullname as string,
        email: res.email,
        organization: {
          id: res?.organization?.id,
          name: res?.organization?.name,
        },
        faculty: {
          id: res?.faculty?.id,
          name: res?.faculty?.name,
        },
        department: {
          id: res?.department?.id,
          name: res?.department?.name,
        },
        role: {
          id: res.role?.id as string,
          name: res.role?.name || '',
          permissions: res.role?.permissions || [],
        },
      },
    };
  }
  async register(payload: TRegisterRequest): Promise<TRegisterResponse> {
    const { email, password, fullname, organizationId, nim } = payload;
    const [isEmailExist, findRole] = await Promise.all([
      this.drizzle
        .select({
          id: schema.users.id,
        })
        .from(schema.users)
        .where(eq(schema.users.email, email))
        .then((res) => res.at(0)),
      this.drizzle
        .select({
          id: schema.roles.id,
        })
        .from(schema.roles)
        .where(ilike(schema.roles.name, 'Ormawa'))
        .then((res) => res.at(0)),
    ]);

    if (isEmailExist) {
      throw new ConflictException('Email telah digunakan');
    }

    const createUser = await this.drizzle
      .insert(schema.users)
      .values({
        fullname: fullname as string,
        email: email as string,
        roleId: findRole?.id as string,
        nim,
        password: await encryptPassword(password as string),
      })
      .returning({
        id: schema.users.id,
      })
      .then((res) => res.at(0));

    if (!createUser) {
      throw new BadRequestException('Gagal membuat akun');
    }
    await this.drizzle.insert(schema.additional).values({
      userId: createUser.id,
      organizationId,
    });
    return {
      message: 'Akun berhasil dibuat, silahkan login!',
    };
  }

  async refresh(payload: TJwtRequest): Promise<TRefreshResponse> {
    const expiresIn = 15 * 60 * 1000;
    const accessToken = await generateAccessToken(payload);
    const now = Date.now();
    const expirationTime = now + expiresIn;

    return {
      accessToken,
      expired: expirationTime,
    };
  }

  async forgotPassword(email: string): Promise<TForgotPasswordResponse> {
    const findUser = await this.userService.findUserByEmail(email);
    const accessToken = await generateAccessToken({
      sub: findUser.id,
      email: findUser.email,
      fullname: findUser.fullname,
      organizationId: findUser?.organization?.id || '',
      facultyId: findUser?.faculty?.id || '',
      departmentId: findUser?.department?.id || '',
      role: {
        id: findUser.role?.id || '',
        name: findUser.role?.name || '',
        permissions: findUser.role?.permissions || [],
      },
    });
    const template = emailTemplate(
      findUser.fullname,
      `${process.env['REDIRECT_FE_URL']}?accessToken=${accessToken}`
    );
    await this.emailService.sendEmail(email, template);
    return {
      message: 'Silahkan check email anda',
    };
  }

  async resetPassword(
    data: TResetPasswordRequest
  ): Promise<TResetPasswordResponse> {
    const { id, password, accessToken } = data;
    const newPassword = password && (await encryptPassword(password as string));
    const res = await this.drizzle
      .update(schema.users)
      .set({
        password: newPassword,
        updatedAt: new Date(),
      })
      .where(eq(schema.users.id, id as string))
      .returning({
        id: schema.users.id,
      })
      .then((res) => res.at(0));

    if (!res) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return {
      message: 'Berhasil update password',
    };
  }

  async google(payload: TGoogleRequest) {
    const { email, avatar, fullname } = payload;

    // eslint-disable-next-line prefer-const
    let [res, findRole] = await Promise.all([
      this.drizzle
        .select({
          id: schema.users.id,
          fullname: schema.users.fullname,
          email: schema.users.email,
          role: {
            id: schema.roles.id,
            name: schema.roles.name,
            permissions: schema.roles.permissions,
          },
        })
        .from(schema.users)
        .leftJoin(schema.roles, eq(schema.roles.id, schema.users.roleId))
        .where(eq(schema.users.email, email as string))
        .then((res) => res.at(0)),
      this.drizzle
        .select({
          id: schema.roles.id,
          name: schema.roles.name,
          permissions: schema.roles.permissions,
        })
        .from(schema.roles)
        .where(ilike(schema.roles.name, 'Ormawa'))
        .then((res) => res.at(0)),
    ]);
    if (!res) {
      const insertUser = await this.drizzle
        .insert(schema.users)
        .values({
          fullname: fullname as string,
          email: email as string,
          roleId: findRole?.id as string,
          avatar: avatar,
        })
        .returning({
          id: schema.users.id,
          fullname: schema.users.fullname,
          email: schema.users.email,
        })
        .then((res) => res.at(0));

      if (!insertUser) {
        throw new BadRequestException();
      }

      res = {
        id: insertUser.id,
        fullname: insertUser.fullname,
        email: insertUser.email,
        role: {
          id: findRole?.id as string,
          name: findRole?.name as string,
          permissions: findRole?.permissions || [],
        },
      };
    }

    const [accessToken, refreshToken, expired] = await Promise.all([
      generateAccessToken({
        sub: res.id,
        email: res.email,
        role: {
          id: res.role?.id || '',
          name: res.role?.name || '',
          permissions: res.role?.permissions || [],
        },
      }),

      generateRefreshToken({
        sub: res.id,
        email: res.email,
        role: {
          id: res.role?.id || '',
          name: res.role?.name || '',
          permissions: res.role?.permissions || [],
        },
      }),
      (() => {
        const expiresIn = 15 * 60 * 1000;
        const now = Date.now();
        return now + expiresIn;
      })(),
    ]);

    return {
      id: res.id,
      token: {
        expired,
        refreshToken,
        accessToken,
      },
      user: {
        id: res.id,
        fullname: res.fullname as string,
        email: res.email,
        role: {
          id: res.role?.id as string,
          name: res.role?.name || '',
          permissions: res.role?.permissions || [],
        },
      },
    };
  }
}
