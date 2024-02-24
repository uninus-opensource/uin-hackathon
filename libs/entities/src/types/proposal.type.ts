import { TMetaResponse } from './meta.type';

export type TProposalRequest = {
  id?: string;
  title?: string;
  file?: string;
};

export type TProposalResponse = TMetaResponse<TProposalRequest[]>;

export type TProposalSingleResponse = TMetaResponse<TProposalRequest>;
