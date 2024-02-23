export type TUser = {
  id: string;
  fullname: string;
  image?: string;
  email: string;
  role: {
    id: string;
    name: string;
    permissions: Array<string>;
  };
};

export type TUserRequest = {
  id?: string;
};

export type TUserResponse = TUserRequest[];

export type TUserSingleResponse = TUserRequest;
