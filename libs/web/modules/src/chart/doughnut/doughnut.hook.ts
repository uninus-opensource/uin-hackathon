import {
 
  TChartResponse,
  TMetaErrorResponse,
} from '@psu/entities';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { GetPieChartData } from './doughnut.api';

export const useGetPieData = (): UseQueryResult<TChartResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['pie-chart-data'],
    queryFn: async () => await GetPieChartData(),
  });
