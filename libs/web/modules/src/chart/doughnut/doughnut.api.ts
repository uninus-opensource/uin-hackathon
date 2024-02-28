import { TChartResponse } from '@psu/entities';
import { api } from '@psu/web-services';

export const GetPieChartData = async (): Promise<TChartResponse> => {
  const { data } = await api<TChartResponse>({
    method: 'GET',
    url: '/activity/chart',
  });
  return data;
};
