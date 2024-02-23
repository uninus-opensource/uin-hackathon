import { TUser } from './user.type';

export type TLoginRequest = {
  email: string;
  password?: string;
};

export type TLoginResponse = {
  id: string;
  user: TUser;
  token: {
    expired: number;
    accessToken: string;
    refreshToken: string;
  };
};

export type TJwtRequest = {
  sub: string;
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

export type TGoogleProfile = {
  displayName: string;
  emails: { value: string }[];
  photos: { value: string }[];
};

export type TGoogleRequest = {
  fullname?: string;
  avatar?: string;
  email: string;
};

export type THeaderRequest = {
  user: TJwtRequest & {
    fullname?: string;
    avatar?: string;
  };
};
