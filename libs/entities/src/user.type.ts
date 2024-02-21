export type TUser = {
  id: number;
  fullname: string;
  image?: string;
  email: string;
  role: {
    id: number;
    name: string;
    permissions: Array<string>;
  };
};
