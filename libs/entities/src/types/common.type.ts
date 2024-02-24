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
