import { TOrganizationRequest, TOrganizationResponse } from '@psu/entities';
import { api } from '@psu/web-services';

export const GetOrganization = async (
  payload: TOrganizationRequest
): Promise<TOrganizationResponse> => {
  const { data } = await api({
    method: 'GET',
    url: '/organization',
    params: payload,
  });
  return data;
};
