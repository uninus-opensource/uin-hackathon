import { TMetaResponse } from '../common';

export type TRoleRequest = {
  id?: string;
  name: string;
  permissions?: string[] | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type TRoleResponse = TMetaResponse<TRoleRequest[]>;

export type TRoleSingleResponse = TMetaResponse<TRoleRequest>;
