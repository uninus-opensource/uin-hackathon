import {
  TMetaErrorResponse,
  TOrganizationRequest,
  TOrganizationResponse,
} from '@psu/entities';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { GetOrganization } from './organization.api';

export const useGetOrganization = (
  payload: TOrganizationRequest
): UseQueryResult<TOrganizationResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['organization', payload],
    queryFn: async () => await GetOrganization(payload),
  });
