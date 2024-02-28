import {
  TActivityRequest,
  TActivityResponse,
  TMetaErrorResponse,
  TPaginationRequest,
} from '@psu/entities';
import { UseMutationResult, UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { CreateActivity, GetSubmissionData } from './submission.api';

export const useGetSubmission = (
  payload: TPaginationRequest
): UseQueryResult<TActivityResponse, TMetaErrorResponse> =>
  useQuery({
    queryKey: ['submission', payload],
    queryFn: async () => await GetSubmissionData(payload),
  });

  export const useCreateActivity = ():UseMutationResult<TActivityResponse,TMetaErrorResponse,TActivityRequest,unknown> => {
    return useMutation({
      mutationKey: ['create-activity'],
      mutationFn: async(payload)=>await CreateActivity(payload)
    })
  }