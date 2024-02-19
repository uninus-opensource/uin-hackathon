/* eslint-disable @typescript-eslint/no-empty-interface */
import { DefaultSession } from 'next-auth';

type TUser = {
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

type TProfile = {
  picture?: string;
};

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: TUser;
  }

  interface Profile extends TProfile {}
  interface AdapterUser extends TUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends TUser {}
}

declare module 'next-auth/core/types' {
  interface User extends Partial<TUser> {
    user?: TUser;
  }

  interface AdapterUser extends Partial<TUser> {
    user?: TUser;
  }
}
