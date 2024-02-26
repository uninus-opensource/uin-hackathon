import { TMetaResponse } from '../common';

export type TFacultyRequest = {
  id?: string;
  name?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};
export type TFacultyResponse = TMetaResponse<TFacultyRequest[]>;

export type TFacultySingleResponse = TMetaResponse<TFacultyRequest>;
