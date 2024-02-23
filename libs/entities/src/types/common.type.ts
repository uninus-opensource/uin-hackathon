import { EPaginationOrderBy } from '../enums';
import { TJwtRequest } from './auth.type';

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
