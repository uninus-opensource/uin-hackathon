import { TUser } from '../user';

export type TLoginRequest = {
  email: string;
  password?: string;
};

export type TToken = {
  expired: number;
  accessToken: string;
  refreshToken: string;
};

export type TRole = {
  id: string;
  name: string;
  permissions: Array<string>;
};

export type TLoginResponse = {
  id: string;
  user: TUser;
  token: TToken;
};

export type TJwtRequest = {
  sub: string;
  email: string;
  fullname?: string;
  organizationId?: string;
  facultyId?: string;
  departmentId?: string;
  role: TRole;
};

export type TRegisterRequest = {
  email: string;
  fullname: string;
  password: string;
  avatar?: string;
  organizationId?: string;
  nim?: string;
};

export type TRegisterResponse = {
  message: string;
};

export type TGoogleProfile = {
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
};

export type TGoogleRequest = {
  fullname?: string;
  avatar?: string;
  email?: string;
  accessToken: string;
};
export type TGoogleResponse = {
  sub?: string;
  name?: string;
  picture?: string;
  email?: string;
};
export type TForgotPasswordRequest = {
  email: string;
};

export type TForgotPasswordResponse = {
  message: string;
};

export type TResetPasswordRequest = {
  password: string;
  id?: string;
  accessToken?: string;
};

export type TResetPasswordResponse = {
  message: string;
};

export type TRefreshResponse = {
  accessToken: string;
  expired: number;
};

export type TRefreshRequest = {
  refreshToken: string;
};
