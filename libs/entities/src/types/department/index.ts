import { TMetaResponse } from '../common';

export type TDepartmentRequest = {
  id?: string;
  name?: string;
  facultyId?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type TDepartmentResponse = TMetaResponse<TDepartmentRequest[]>;

export type TDepartmentSingleResponse = TMetaResponse<TDepartmentRequest>;
