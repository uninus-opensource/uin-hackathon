import { TMetaResponse } from '../common';
export type TUser = {
  id: string;
  fullname: string;
  image?: string;
  email: string;
  organization?: {
    id?: string;
    name?: string;
  };
  faculty?: {
    id?: string;
    name?: string;
  };
  department?: {
    id?: string;
    name?: string;
  };
  role: {
    id: string;
    name: string;
    permissions: Array<string>;
  };
};

export type TUserRequest = {
  id?: string;
  fullname: string | null;
  email?: string;
  roleId?: string;
  avatar?: string;
  password?: string;
};
export type TUserResponse = TMetaResponse<TUserRequest[]>;

export type TUserSingleResponse = TMetaResponse<TUserRequest>;
