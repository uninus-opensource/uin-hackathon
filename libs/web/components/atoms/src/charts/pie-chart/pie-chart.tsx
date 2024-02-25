'use client';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FC, ReactElement, useRef } from 'react';
import { TLineChart } from '@psu/entities';

export const PieChart: FC<TLineChart> = ({ ...props }): ReactElement => {
  const chartRef = useRef();

  ChartJS.register(ArcElement, Tooltip, Legend, ...registerables);

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'left' as const,
      },
    },
  };

  const data = {
    labels: [
      'Kegiatan Berjalan',
      'Kegiatan Belum dilaporkan',
      'Kegiatan Sudah dilaporkan',
    ],
    datasets: [
      {
        label: 'Laporan Kegiatan',
        data: [20, 10, 30],
        backgroundColor: ['#1B81F7', '#FFB800', '#34B337'],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2 items-center">
          <h1 className="text-xl font-semibold ">{props.title}</h1>
        </div>
      </div>
      <div className="w-full pt-8 h-96">
        <Doughnut
          ref={chartRef}
          datasetIdKey="id"
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                align: 'start',
                labels: { boxWidth: 40, boxHeight: 20, padding: 15 },
              },
            },
          }}
          data={props.data || data}
        />
      </div>
    </div>
  );
};
