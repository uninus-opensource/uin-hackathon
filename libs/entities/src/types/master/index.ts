import { EorganizationLevel, EorganizationType } from '../../enums';
import { TMetaResponse } from '../common';

export type TOrganizationRequest = {
  id?: string;
  name?: string;
  organizationType?: EorganizationType | string | null;
  organizationLevel?: EorganizationLevel | string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type TOrganizationResponse = TMetaResponse<TOrganizationRequest[]>;

export type TOrganizationSingleResponse = TMetaResponse<TOrganizationRequest>;

export type TOrganizationFindRequest = Pick<
  TOrganizationRequest,
  'organizationType' | 'organizationLevel'
>;

export type TRoleRequest = {
  id?: string;
  name: string;
  permissions?: string[] | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type TRoleResponse = TMetaResponse<TRoleRequest[]>;

export type TRoleSingleResponse = TMetaResponse<TRoleRequest>;

export type TFacultyRequest = {
  id?: string;
  name?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type TFacultyResponse = TMetaResponse<TFacultyRequest[]>;

export type TFacultySingleResponse = TMetaResponse<TFacultyRequest>;

export type TDepartmentRequest = {
  id?: string;
  name?: string;
  facultyId?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type TDepartmentResponse = TMetaResponse<TDepartmentRequest[]>;

export type TDepartmentSingleResponse = TMetaResponse<TDepartmentRequest>;
