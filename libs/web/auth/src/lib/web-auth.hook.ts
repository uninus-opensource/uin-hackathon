import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { PostRegister } from './web-auth.api';
import {
  TMetaErrorResponse,
  TRegisterRequest,
  TRegisterResponse,
} from '@psu/entities';

export const useRegister = (): UseMutationResult<
  TRegisterResponse,
  TMetaErrorResponse,
  TRegisterRequest,
  unknown
> =>
  useMutation({
    mutationKey: ['auth-register'],
    mutationFn: async (props) => await PostRegister(props),
  });
