import { LineChart } from '@psu/web-component-atoms';
import { FC, ReactElement } from 'react';

export const DashboardModules: FC = (): ReactElement => {
  return (
    <LineChart
      chartType={'januari'}
      title={''}
      data={{
        labels: [],
        datasets: [],
      }}
    />
  );
};
