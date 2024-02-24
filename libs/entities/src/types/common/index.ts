import { EPaginationOrderBy } from '../../enums';
import { TJwtRequest } from '../auth';
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
export type THeaderRequest = {
  user: TJwtRequest & {
    fullname?: string;
    avatar?: string;
  };
};

export type TPaginationRequest = {
  page: string;
  perPage: string;
  orderBy: EPaginationOrderBy;
  search: string;
};

export type TMetaResponse<T = null | undefined> = {
  message?: string;
  data?: T;
  meta?: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev?: null | number;
    next?: null | number;
  };
};

export type TSize = 'sm' | 'md' | 'lg';

export type TVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'error';

export type TVariantType = 'solid' | 'outline';

export type TState = 'default' | 'loading';

export type TInput = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> & {
  size: TSize;
  status: Omit<TVariant, 'primary' | 'secondary'>;
};

export type TInputCheckbox = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size' | 'type'
> & {
  size: TSize;
  status: Omit<TVariant, 'primary' | 'secondary'>;
};

export type TTextArea = Omit<
  DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >,
  'size'
> & {
  size: TSize;
  status: Omit<TVariant, 'primary' | 'secondary'>;
};
