import { EActivityStatusTranslation, EChartType } from '../../enums';

export type TChartResponse = {
  message?: string;
  type?: EChartType;
  labels?: EActivityStatusTranslation[] | string[];
  datasets?: {
    label?: string;
    data?: number[];
    backgroundColor?: string[] | string;
    pointBorderColor?: string;
    pointBorderWidth?: number;
    pointBackgroundColor?: string;
    hoverOffset?: number;
    fill?: boolean;
    borderColor?: string;
    tention?: number;
  }[];
};
