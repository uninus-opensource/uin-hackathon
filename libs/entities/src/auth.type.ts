import { TUser } from './user.type';

export type TLoginRequest = {
  email: string;
  password?: string;
};

export type TLoginResponse = {
  id: number;
  user: TUser;
  token: {
    expired: number;
    accessToken: string;
    refreshToken: string;
  };
};

export type TJwtRequest = {
  sub: number;
  email: string;
  role: {
    name: string;
    permissions: Array<string>;
  };
};

export type TRegisterRequest = Pick<TLoginRequest, 'email'> & {
  fullname: string;
  password: string;
};

export type TRegisterResponse = {
  message: string;
};
