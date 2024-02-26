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
