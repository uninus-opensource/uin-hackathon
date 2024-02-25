'use client';
import { PieChart } from '@psu/web-component-atoms';
import { FC, ReactElement } from 'react';

export const DashboardChartDoughnutModule: FC = (): ReactElement => {
  return (
    <section className="h-full bg-white rounded-lg w-1/2 p-6 shadow-md">
      <PieChart chartType={'januari'} title={'Rekap Data Randa Bohay'} />
    </section>
  );
};
