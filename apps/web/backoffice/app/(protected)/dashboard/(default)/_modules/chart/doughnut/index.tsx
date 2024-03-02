'use client';
import { PieChart } from '@psu/web-component-atoms';
import { useGetPieData } from '@psu/web-modules';
import { FC, ReactElement } from 'react';

export const DashboardChartDoughnutModule: FC = (): ReactElement => {
  const {data,isLoading} = useGetPieData();
  return (
    <section className="h-full bg-white rounded-lg w-1/2 p-6 shadow-md">
      <h1 className="text-xl font-semibold">Laporan Kegiatan</h1>
      {
        isLoading ? <p>Loading...</p> :
      <PieChart  data={data?.data as any}/>
      }
    </section>
  );
};
