import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { PostForgot, PostRegister } from './web-auth.api';
import {
  TForgotPasswordRequest,
  TForgotPasswordResponse,
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

export const useForgot = (): UseMutationResult<
  TForgotPasswordResponse,
  TMetaErrorResponse,
  TForgotPasswordRequest,
  unknown
> =>
  useMutation({
    mutationKey: ['auth-forgot'],
    mutationFn: async (props) => await PostForgot(props),
  });
