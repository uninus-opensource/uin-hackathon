import { TMetaResponse } from '../common';

export type TActivityRequest = {
  id?: string;
  name?: string;
  description?: string;
  location?: string;
};

export type TActivityResponse = TMetaResponse<TActivityRequest[]>;

export type TActivitySingleResponse = TMetaResponse<TActivityRequest>;
