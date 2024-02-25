import { TMetaResponse } from '../common';

export type TActivityRequest = {
  id?: string;
  name?: string;
  lead?: string;
  proposal?: string;
  description?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  budget?: string;
  organizationId?: string;
  reviewers?: string[];
};

export type TActivityResponse = TMetaResponse<TActivityRequest[]>;

export type TActivitySingleResponse = TMetaResponse<TActivityRequest>;
