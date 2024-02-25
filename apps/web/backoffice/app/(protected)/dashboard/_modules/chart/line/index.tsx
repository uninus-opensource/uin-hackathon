'use client';
import { LineChart } from '@psu/web-component-atoms';
import { FC, ReactElement } from 'react';

export const DashboardChartLineModule: FC = (): ReactElement => {
  return (
    <section className="h-full bg-white rounded-lg w-full p-6 shadow-md">
      <LineChart title="Data Randa Terkini" chartType={'januari'} />
    </section>
  );
};
