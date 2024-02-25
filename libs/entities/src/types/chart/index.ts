import { EActivityStatusTranslation, EChartType } from '../../enums';

export type TChartResponse = {
  message?: string;
  type?: EChartType;
  labels?: EActivityStatusTranslation[] | string[];
  datasets?: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    hoverOffset?: number;
    fill?: boolean;
    borderColor?: string;
    tension?: number;
  }[];
};
