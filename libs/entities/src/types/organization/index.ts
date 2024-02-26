import { EorganizationLevel, EorganizationType } from '../../enums';
import { TMetaResponse } from '../common';

export type TOrganizationRequest = {
  id?: string;
  name?: string;
  organizationType?: EorganizationType | null | 'UKM' | 'Ormawa';
  organizationLevel?:
    | EorganizationLevel
    | 'Universitas'
    | 'Fakultas'
    | 'Prodi'
    | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type TOrganizationResponse = TMetaResponse<TOrganizationRequest[]>;

export type TOrganizationSingleResponse = TMetaResponse<TOrganizationRequest>;
