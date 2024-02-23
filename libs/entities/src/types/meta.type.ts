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
